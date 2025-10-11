import { categoriesDocs } from './categoriesDocs.js';
import { votesDocs } from './votesDocs.js';

export const apiDocPaths = {
    ...categoriesDocs,
    ...votesDocs
};

const generateOpenAPIDocs = () => {
    const config = {
        openapi: "3.0.0",
        info: {
            title: "Tech Choices API",
            version: "1.0.0",
            description: `
# 🚀 Tech Choices API

Uma API completa para votação em tecnologias de desenvolvimento!

## 📋 O que você pode fazer:
- ✅ **Consultar categorias** disponíveis
- 🗳️ **Votar** nas suas tecnologias favoritas  
- 📊 **Ver estatísticas** de votação em tempo real
- 🧪 **Testar** todos os endpoints interativamente

## 🏷️ Categorias Disponíveis:
1. **Frontend vs Backend** - Sua preferência de desenvolvimento
2. **JavaScript vs TypeScript** - Linguagens de programação
3. **SQL vs NoSQL** - Tipos de banco de dados  
4. **GitHub vs GitLab** - Plataformas de versionamento
5. **Windows vs Linux vs macOS** - Sistemas operacionais

## 🎯 Como usar:
1. Faça um GET em \`/api/categories\` para ver todas as categorias
2. Faça um POST em \`/api/categories/{categoria}/votes\` para votar
3. Visualize os resultados e teste livremente!

---
💻 **Código fonte**: [GitHub](https://github.com/vximoraes/tech-choices)
            `,
            contact: {
                name: "Tech Choices Team",
                email: "contato@techchoices.com",
                url: "https://github.com/vximoraes/tech-choices"
            },
            license: {
                name: "MIT",
                url: "https://opensource.org/licenses/MIT"
            }
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Servidor de Desenvolvimento"
            },
            {
                url: process.env.API_URL || "https://tech-choices-api.vercel.app",
                description: "Servidor de Produção"
            }
        ],
        tags: [
            {
                name: "Categories",
                description: "Operações relacionadas às categorias de votação disponíveis"
            },
            {
                name: "Votes",
                description: "Operações de votação - visualizar e registrar votos nas categorias"
            }
        ]
    };

    const paths = {};
    
    Object.entries(apiDocPaths).forEach(([path, methods]) => {
        paths[path] = {};
        
        Object.entries(methods).forEach(([method, config]) => {
            paths[path][method] = {
                summary: config.summary,
                description: config.description,
                tags: [getTagFromPath(path)],
                ...(config.schema?.body && {
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: zodToOpenApiSchema(config.schema.body)
                            }
                        }
                    }
                }),
                responses: {
                    200: {
                        description: 'Sucesso',
                        content: {
                            'application/json': {
                                schema: config.schema?.response ? 
                                    zodToOpenApiSchema(config.schema.response) : 
                                    { type: 'object' }
                            }
                        }
                    },
                    ...(config.responses || {})
                }
            };
        });
    });

    return {
        ...config,
        paths
    };
};

function getTagFromPath(path) {
    if (path.includes('/categories') && !path.includes('/vote')) return 'Categories';
    if (path.includes('/categories') && (path.includes('/vote') || path.includes('/votes'))) return 'Votes';
    return 'General';
}

function zodToOpenApiSchema(zodSchema) {

    if (zodSchema._def?.typeName === 'ZodArray') {
        return {
            type: 'array',
            items: zodToOpenApiSchema(zodSchema._def.type)
        };
    }
    
    if (zodSchema._def?.typeName === 'ZodObject') {
        const properties = {};
        const required = [];
        
        Object.entries(zodSchema._def.shape()).forEach(([key, value]) => {
            properties[key] = zodToOpenApiSchema(value);
            if (!value.isOptional()) {
                required.push(key);
            }
        });
        
        return {
            type: 'object',
            properties,
            ...(required.length > 0 && { required })
        };
    }
    
    if (zodSchema._def?.typeName === 'ZodEnum') {
        return {
            type: 'string',
            enum: zodSchema._def.values
        };
    }
    
    if (zodSchema._def?.typeName === 'ZodString') {
        return { type: 'string' };
    }
    
    if (zodSchema._def?.typeName === 'ZodNumber') {
        return { type: 'number' };
    }
    
    return { type: 'object' };
}

export default generateOpenAPIDocs;