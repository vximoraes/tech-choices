import { Router } from 'express';
import { GithubGitlabController } from '../controllers/GithubGitlabController.js';

const router = Router();
const githubGitlabController = new GithubGitlabController();

// GET /api/github-gitlab/votes - Obter votos
router.get('/votes', (req, res) => githubGitlabController.getVotes(req, res));

// POST /api/github-gitlab/vote - Adicionar voto
router.post('/vote', (req, res) => githubGitlabController.addVote(req, res));

// GET /api/github-gitlab/stats - Estatísticas detalhadas
router.get('/stats', (req, res) => githubGitlabController.getStats(req, res));

export default router;