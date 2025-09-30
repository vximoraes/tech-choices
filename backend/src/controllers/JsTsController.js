import { VoteService } from '../services/VoteService.js';
import { ZodError } from 'zod';
import { z } from 'zod';

const JsTsVoteSchema = z.object({
    option: z.enum(['javascript', 'typescript'], {
        message: 'Option must be either "javascript" or "typescript"'
    })
});

export class JsTsController {
    constructor() {
        this.voteService = new VoteService();
        this.category = 'js-ts';
    }

    // GET /api/js-ts/votes - Obter votos do JavaScript vs TypeScript
    async getVotes(req, res) {
        try {
            const votes = await this.voteService.getVotesByCategory(this.category);
            res.json(votes);
        } catch (error) {
            console.error('Error fetching js-ts votes:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to fetch JavaScript vs TypeScript votes'
            });
        }
    }

    // POST /api/js-ts/vote - Votar no JavaScript vs TypeScript
    async addVote(req, res) {
        try {
            const { option } = JsTsVoteSchema.parse(req.body);
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
                    message: error.issues[0]?.message || 'Invalid option for JavaScript vs TypeScript'
                });
                return;
            }

            console.error('Error adding js-ts vote:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to add JavaScript vs TypeScript vote'
            });
        }
    }

    // GET /api/js-ts/stats - Estatísticas específicas do JavaScript vs TypeScript
    async getStats(req, res) {
        try {
            const votes = await this.voteService.getVotesByCategory(this.category);

            const javascript = votes.find(v => v.option === 'javascript') || { count: 0 };
            const typescript = votes.find(v => v.option === 'typescript') || { count: 0 };
            const total = javascript.count + typescript.count;

            const stats = {
                category: 'JavaScript vs TypeScript',
                total_votes: total,
                javascript: {
                    count: javascript.count,
                    percentage: total > 0 ? Math.round((javascript.count / total) * 100) : 0
                },
                typescript: {
                    count: typescript.count,
                    percentage: total > 0 ? Math.round((typescript.count / total) * 100) : 0
                },
                leader: javascript.count > typescript.count ? 'javascript' :
                    typescript.count > javascript.count ? 'typescript' : 'tie'
            };

            res.json(stats);
        } catch (error) {
            console.error('Error fetching js-ts stats:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to fetch JavaScript vs TypeScript statistics'
            });
        }
    }
}