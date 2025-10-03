import { Router } from 'express';
import { FrontBackController } from '../controllers/FrontBackController.js';

const router = Router();
const frontBackController = new FrontBackController();

// GET /api/front-back/votes - Obter votos
router.get('/votes', (req, res) => frontBackController.getVotes(req, res));

// POST /api/front-back/vote - Adicionar voto
router.post('/vote', (req, res) => frontBackController.addVote(req, res));

// GET /api/front-back/stats - Estatísticas detalhadas
router.get('/stats', (req, res) => frontBackController.getStats(req, res));

export default router;