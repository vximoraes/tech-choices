// CONTEÚDO ATUALIZADO DE: backend/src/api/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import voteRoutes from '../routes/voteRoutes.js';
import { VoteService } from '../services/VoteService.js';
import { setupSwagger } from '../docs/swagger.js';
import { setupScalar } from '../docs/scalar.js';

dotenv.config();

const app = express();

// Conexão com o banco de dados
connectDB().then(async () => {
    const voteService = new VoteService();
    await voteService.initializeAllVotes();
    console.log('All vote categories and options initialized');
}).catch(error => {
    console.error('Failed to connect to DB and initialize votes:', error);
    process.exit(1);
});


// Configuração CORS mais específica para evitar problemas
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'https://scalar.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Configuração da documentação Swagger e Scalar
setupSwagger(app);
setupScalar(app);

app.use('/api', voteRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Servir página de teste
app.get('/test-vote', (req, res) => {
    res.sendFile('test-vote.html', { root: '.' });
});

// Servir página de teste de todas as categorias
app.get('/test-all', (req, res) => {
    res.sendFile('test-all-votes.html', { root: '.' });
});

// Servir página de debug da API
app.get('/debug', (req, res) => {
    res.sendFile('debug-api.html', { root: '.' });
});

// Rota raiz com informações da API
app.get('/', (req, res) => {
    res.json({
        name: 'Tech Choices API',
        version: '1.0.0',
        description: 'API para votação em tecnologias',
        documentation: {
            swagger: '/api/docs',
            scalar: '/api/scalar',
            openapi: '/api/openapi.json'
        },
        health: '/health',
        endpoints: {
            categories: '/api/categories',
            votes: '/api/categories/{categoryId}/votes',
            vote: '/api/categories/{categoryId}/vote'
        },
        availableCategories: [
            'front-back',
            'js-ts', 
            'sql-nosql',
            'github-gitlab',
            'windows-linux-mac'
        ],
        examples: {
            getAllCategories: '/api/categories',
            getFrontBackVotes: '/api/categories/front-back/votes',
            voteForTypeScript: 'POST /api/categories/js-ts/vote {"option": "typescript"}'
        }
    });
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/health`);
    });
}

export default app;