import { Router } from 'express';
import { CategoriesController } from '../controllers/CategoriesController.js';

const router = Router();
const categoriesController = new CategoriesController();

// GET /api/categories - Listar todas as categorias
router.get('/', (req, res) => categoriesController.getAllCategories(req, res));

export default router;