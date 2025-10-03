import { Router } from 'express';
import { SqlNosqlController } from '../controllers/SqlNosqlController.js';

const router = Router();
const sqlNosqlController = new SqlNosqlController();

// GET /api/sql-nosql/votes - Obter votos
router.get('/votes', (req, res) => sqlNosqlController.getVotes(req, res));

// POST /api/sql-nosql/vote - Adicionar voto
router.post('/vote', (req, res) => sqlNosqlController.addVote(req, res));

// GET /api/sql-nosql/stats - Estatísticas detalhadas
router.get('/stats', (req, res) => sqlNosqlController.getStats(req, res));

export default router;