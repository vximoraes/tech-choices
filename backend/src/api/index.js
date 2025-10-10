// CONTEÚDO ATUALIZADO DE: backend/src/api/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import voteRoutes from '../routes/voteRoutes.js';
import { VoteService } from '../services/VoteService.js';

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


app.use(cors());
app.use(express.json());

app.use('/api', voteRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/health`);
    });
}

export default app;