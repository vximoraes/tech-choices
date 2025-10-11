import generateOpenAPIDocs from './index.js';

/**
 * Configura o Scalar API Reference para a documentação da API
 */
export function setupScalar(app) {
    const openApiSpec = generateOpenAPIDocs();
    
    // Rota para servir a documentação com Scalar
    app.get('/api/scalar', (req, res) => {
        // Ajustar a spec para garantir servidor correto e funcionalidade completa
        const adjustedSpec = {
            ...openApiSpec,
            servers: [
                {
                    url: `http://localhost:${process.env.PORT || 3001}`,
                    description: "Servidor Local de Desenvolvimento"
                }
            ]
        };
        
        const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Tech Choices API - Scalar Documentation</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .loading { 
            display: flex; 
            flex-direction: column;
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            color: #666;
        }
        .loading h2 { color: #2563eb; margin-bottom: 10px; }
        .loading p { margin: 5px 0; }
        .loading a { color: #2563eb; text-decoration: none; margin: 0 10px; }
        .loading a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="loading" id="loading">
        <h2>🚀 Tech Choices API</h2>
        <p>Carregando documentação interativa com Scalar...</p>
        <div style="margin-top: 20px;">
            <a href="/api/docs">📚 Swagger UI</a>
            <a href="/api/test">🧪 Testar API</a>
            <a href="/test-all">🎯 Testar Todas</a>
        </div>
    </div>
    
    <script 
        id="api-reference" 
        type="application/json">
${JSON.stringify(adjustedSpec, null, 2)}
    </script>
    
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference@latest"></script>
    
    <script>
        // Configuração personalizada do Scalar
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                const loading = document.getElementById('loading');
                if (loading) {
                    loading.style.display = 'none';
                }
            }, 1500);
        });
    </script>
</body>
</html>`;
        
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    });
    
    // Endpoint para obter a spec em JSON (útil para integração externa)
    app.get('/api/openapi.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(openApiSpec);
    });
    
    // Página de teste da API
    app.get('/api/test', (req, res) => {
        const testHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Tech Choices API - Teste</title>
    <meta charset="utf-8" />
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        pre { background: #f5f5f5; padding: 10px; border-radius: 5px; }
        .success { color: green; }
        .error { color: red; }
        .button { 
            display: inline-block;
            padding: 10px 20px; 
            background: #2563eb; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px;
            margin: 5px;
        }
    </style>
</head>
<body>
    <h1>🧪 Teste da API Tech Choices</h1>
    <div id="results">Carregando testes...</div>
    
    <script>
        async function runTests() {
            const resultsDiv = document.getElementById('results');
            
            try {
                // Teste das categorias
                const response = await fetch('/api/categories');
                const data = await response.json();
                
                resultsDiv.innerHTML = \`
                    <h2 class="success">✅ API funcionando!</h2>
                    <p><strong>Categorias encontradas:</strong> \${data.length}</p>
                    <pre>\${JSON.stringify(data, null, 2)}</pre>
                    
                    <div style="margin-top: 20px;">
                        <a href="/api/scalar" class="button">🚀 Scalar Docs</a>
                        <a href="/api/docs" class="button">📚 Swagger UI</a>
                        <a href="/api/openapi.json" class="button">📄 OpenAPI JSON</a>
                    </div>
                \`;
            } catch (error) {
                resultsDiv.innerHTML = \`
                    <h2 class="error">❌ Erro na API</h2>
                    <p>Erro: \${error.message}</p>
                    <p>Verifique se o servidor está rodando em http://localhost:3001</p>
                \`;
            }
        }
        
        runTests();
    </script>
</body>
</html>`;
        
        res.setHeader('Content-Type', 'text/html');
        res.send(testHtml);
    });
}

export default setupScalar;