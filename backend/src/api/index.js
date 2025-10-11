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


// Configuração CORS mais permissiva para Vercel
app.use(cors({
    origin: function (origin, callback) {
        // Permitir requisições sem origin (ex: aplicações móveis, Postman)
        if (!origin) return callback(null, true);
        
        // Lista de domínios permitidos
        const allowedOrigins = [
            'http://localhost:3001',
            'http://localhost:3000', 
            'https://scalar.com',
            'https://tech-choices-front.vercel.app',
            'https://tech-choices.vercel.app'
        ];
        
        // Permitir qualquer subdomínio do Vercel
        const isVercelDomain = origin.includes('.vercel.app');
        const isLocalhost = origin.includes('localhost');
        const isAllowedOrigin = allowedOrigins.includes(origin);
        
        if (isAllowedOrigin || isVercelDomain || isLocalhost) {
            return callback(null, true);
        }
        
        console.log('CORS blocked origin:', origin);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}));

// Middleware adicional para garantir headers CORS
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Verificar se a origem é permitida
    const allowedOrigins = [
        'http://localhost:3001',
        'http://localhost:3000', 
        'https://scalar.com',
        'https://tech-choices-front.vercel.app',
        'https://tech-choices.vercel.app'
    ];
    
    const isVercelDomain = origin && origin.includes('.vercel.app');
    const isLocalhost = origin && origin.includes('localhost');
    const isAllowedOrigin = origin && allowedOrigins.includes(origin);
    
    if (isAllowedOrigin || isVercelDomain || isLocalhost || !origin) {
        res.header('Access-Control-Allow-Origin', origin || '*');
    }
    
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

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