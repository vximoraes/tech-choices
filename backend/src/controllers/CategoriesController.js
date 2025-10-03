import { VoteService } from '../services/VoteService.js';

export class CategoriesController {
    constructor() {
        this.voteService = new VoteService();
    }

    // GET /api/categories - Listar todas as categorias
    async getAllCategories(req, res) {
        try {
            const categories = await this.voteService.getAllCategories();
            res.json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to fetch categories'
            });
        }
    }
}