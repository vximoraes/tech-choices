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

export default router;