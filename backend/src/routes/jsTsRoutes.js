import { Router } from 'express';
import { JsTsController } from '../controllers/JsTsController.js';

const router = Router();
const jsTsController = new JsTsController();

// GET /api/js-ts/votes - Obter votos
router.get('/votes', (req, res) => jsTsController.getVotes(req, res));

// POST /api/js-ts/vote - Adicionar voto
router.post('/vote', (req, res) => jsTsController.addVote(req, res));

// GET /api/js-ts/stats - Estatísticas detalhadas
router.get('/stats', (req, res) => jsTsController.getStats(req, res));

export default router;