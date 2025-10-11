import { z } from 'zod';

export const voteSchema = z.object({
    category: z.enum(['front-back', 'js-ts', 'sql-nosql', 'github-gitlab', 'windows-linux-mac']).meta({
        description: "Categoria do voto",
        example: "front-back"
    }),
    option: z.string().meta({
        description: "Opção votada",
        example: "frontend"
    }),
    count: z.number().int().min(0).meta({
        description: "Quantidade de votos para esta opção",
        example: 42
    })
});

export const categoryVotesSchema = z.array(voteSchema).meta({
    description: "Lista de votos para uma categoria específica"
});

export const categorySchema = z.object({
    id: z.string().meta({
        description: "ID único da categoria",
        example: "front-back"
    }),
    name: z.string().meta({
        description: "Nome da categoria",
        example: "Frontend vs Backend"
    }),
    description: z.string().meta({
        description: "Descrição da categoria",
        example: "Escolha entre desenvolvimento Frontend ou Backend"
    }),
    options: z.array(z.string()).meta({
        description: "Opções disponíveis para votação",
        example: ["frontend", "backend"]
    })
});

export const allCategoriesSchema = z.array(categorySchema).meta({
    description: "Lista de todas as categorias disponíveis"
});

export const frontBackVoteSchema = z.object({
    option: z.enum(['frontend', 'backend'], {
        message: 'Option must be either "frontend" or "backend"'
    }).meta({
        description: "Escolha entre frontend ou backend",
        example: "frontend"
    })
});

export const jsTsVoteSchema = z.object({
    option: z.enum(['javascript', 'typescript'], {
        message: 'Option must be either "javascript" or "typescript"'
    }).meta({
        description: "Escolha entre JavaScript ou TypeScript",
        example: "typescript"
    })
});

export const sqlNosqlVoteSchema = z.object({
    option: z.enum(['sql', 'nosql'], {
        message: 'Option must be either "sql" or "nosql"'
    }).meta({
        description: "Escolha entre SQL ou NoSQL",
        example: "sql"
    })
});

export const githubGitlabVoteSchema = z.object({
    option: z.enum(['github', 'gitlab'], {
        message: 'Option must be either "github" or "gitlab"'
    }).meta({
        description: "Escolha entre GitHub ou GitLab",
        example: "github"
    })
});

export const windowsLinuxMacVoteSchema = z.object({
    option: z.enum(['windows', 'linux', 'mac'], {
        message: 'Option must be either "windows", "linux" or "mac"'
    }).meta({
        description: "Escolha entre Windows, Linux ou Mac",
        example: "linux"
    })
});


export const voteResponseSchema = z.object({
    success: z.boolean().meta({
        description: "Indica se o voto foi registrado com sucesso",
        example: true
    }),
    category: z.string().meta({
        description: "Categoria votada",
        example: "front-back"
    }),
    option: z.string().meta({
        description: "Opção votada",
        example: "frontend"
    }),
    count: z.number().int().min(1).meta({
        description: "Novo total de votos para esta opção",
        example: 43
    })
});

export const errorSchema = z.object({
    error: z.string().meta({
        description: "Tipo do erro",
        example: "Validation error"
    }),
    message: z.string().meta({
        description: "Mensagem detalhada do erro",
        example: "Option must be either 'frontend' or 'backend'"
    })
});