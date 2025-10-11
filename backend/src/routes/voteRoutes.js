import { Router } from 'express';
import categoriesRoutes from './categoriesRoutes.js';
import frontBackRoutes from './frontBackRoutes.js';
import jsTsRoutes from './jsTsRoutes.js';
import sqlNosqlRoutes from './sqlNosqlRoutes.js';
import githubGitlabRoutes from './githubGitlabRoutes.js';
import windowsLinuxMacRoutes from './windowsLinuxMacRoutes.js';

const router = Router();

// Rotas específicas por categoria
router.use('/categories', categoriesRoutes);
router.use('/categories/front-back', frontBackRoutes);
router.use('/categories/js-ts', jsTsRoutes);
router.use('/categories/sql-nosql', sqlNosqlRoutes);
router.use('/categories/github-gitlab', githubGitlabRoutes);
router.use('/categories/windows-linux-mac', windowsLinuxMacRoutes);

// Rotas alternativas para compatibilidade com frontend (sem /categories)
router.use('/front-back', frontBackRoutes);
router.use('/js-ts', jsTsRoutes);
router.use('/sql-nosql', sqlNosqlRoutes);
router.use('/github-gitlab', githubGitlabRoutes);
router.use('/windows-linux-mac', windowsLinuxMacRoutes);

export default router;