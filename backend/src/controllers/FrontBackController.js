import { VoteService } from '../services/VoteService.js';
import { ZodError } from 'zod';
import { z } from 'zod';

const FrontBackVoteSchema = z.object({
    option: z.enum(['frontend', 'backend'], {
        message: 'Option must be either "frontend" or "backend"'
    })
});

export class FrontBackController {
    constructor() {
        this.voteService = new VoteService();
        this.category = 'front-back';
    }

    // GET /api/front-back/votes - Obter votos do Front-Back
    async getVotes(req, res) {
        try {
            const votes = await this.voteService.getVotesByCategory(this.category);
            res.json(votes);
        } catch (error) {
            console.error('Error fetching front-back votes:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to fetch front-back votes'
            });
        }
    }

    // POST /api/front-back/vote - Votar no Front-Back
    async addVote(req, res) {
        try {
            const { option } = FrontBackVoteSchema.parse(req.body);

            const updatedVote = await this.voteService.addVote(this.category, option);

            res.json({
                category: this.category,
                option: updatedVote.option,
                count: updatedVote.count
            });
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    error: 'Validation error',
                    message: error.issues[0]?.message || 'Invalid option for front-back'
                });
                return;
            }

            console.error('Error adding front-back vote:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to add front-back vote'
            });
        }
    }

    // GET /api/front-back/stats - Estatísticas específicas do Front-Back
    async getStats(req, res) {
        try {
            const votes = await this.voteService.getVotesByCategory(this.category);

            const frontend = votes.find(v => v.option === 'frontend') || { count: 0 };
            const backend = votes.find(v => v.option === 'backend') || { count: 0 };
            const total = frontend.count + backend.count;

            const stats = {
                category: 'Front-End vs Back-End',
                total_votes: total,
                frontend: {
                    count: frontend.count,
                    percentage: total > 0 ? Math.round((frontend.count / total) * 100) : 0
                },
                backend: {
                    count: backend.count,
                    percentage: total > 0 ? Math.round((backend.count / total) * 100) : 0
                },
                leader: frontend.count > backend.count ? 'frontend' :
                    backend.count > frontend.count ? 'backend' : 'tie'
            };

            res.json(stats);
        } catch (error) {
            console.error('Error fetching front-back stats:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to fetch front-back statistics'
            });
        }
    }
}