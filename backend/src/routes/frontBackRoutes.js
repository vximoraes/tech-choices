import { Router } from 'express';
import { FrontBackController } from '../controllers/FrontBackController.js';

const router = Router();
const frontBackController = new FrontBackController();

// GET /api/front-back/votes - Obter votos
router.get('/votes', (req, res) => frontBackController.getVotes(req, res));

// POST /api/front-back/vote - Adicionar voto
router.post('/vote', (req, res) => frontBackController.addVote(req, res));

// POST /api/front-back/test - Teste do body parser
router.post('/test', (req, res) => {
    res.json({
        message: 'Test endpoint',
        body: req.body,
        bodyType: typeof req.body,
        contentType: req.get('Content-Type'),
        headers: req.headers
    });
});

// GET /api/front-back/stats - Estatísticas detalhadas
router.get('/stats', (req, res) => frontBackController.getStats(req, res));

export default router;