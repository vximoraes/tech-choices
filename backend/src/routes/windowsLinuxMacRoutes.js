import { Router } from 'express';
import { WindowsLinuxMacController } from '../controllers/WindowsLinuxMacController.js';

const router = Router();
const windowsLinuxMacController = new WindowsLinuxMacController();

// GET /api/windows-linux-mac/votes - Obter votos
router.get('/votes', (req, res) => windowsLinuxMacController.getVotes(req, res));

// POST /api/windows-linux-mac/vote - Adicionar voto
router.post('/vote', (req, res) => windowsLinuxMacController.addVote(req, res));

// GET /api/windows-linux-mac/stats - Estatísticas detalhadas
router.get('/stats', (req, res) => windowsLinuxMacController.getStats(req, res));

export default router;