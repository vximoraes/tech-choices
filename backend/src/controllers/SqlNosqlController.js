import { VoteService } from '../services/VoteService.js';
import { ZodError } from 'zod';
import { z } from 'zod';

const SqlNosqlVoteSchema = z.object({
    option: z.enum(['sql', 'nosql'], {
        message: 'Option must be either "sql" or "nosql"'
    })
});

export class SqlNosqlController {
    constructor() {
        this.voteService = new VoteService();
        this.category = 'sql-nosql';
    }

    // GET /api/sql-nosql/votes - Obter votos do SQL vs NoSQL
    async getVotes(req, res) {
        try {
            const votes = await this.voteService.getVotesByCategory(this.category);
            res.json(votes);
        } catch (error) {
            console.error('Error fetching votes:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // POST /api/sql-nosql/vote - Votar no SQL vs NoSQL
    async addVote(req, res) {
        try {
            const { option } = SqlNosqlVoteSchema.parse(req.body);
            const updatedVote = await this.voteService.addVote(this.category, option);
            
            res.json({
                success: true,
                category: this.category,
                option: updatedVote.option,
                count: updatedVote.count
            });
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    error: 'Validation error',
                    message: `Invalid input: ${error.issues.map(i => i.message).join(', ')}`
                });
                return;
            }

            console.error('Error adding sql-nosql vote:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to add sql-nosql vote'
            });
        }
    }

    // GET /api/sql-nosql/stats - Estatísticas específicas do SQL vs NoSQL
    async getStats(req, res) {
        try {
            const votes = await this.voteService.getVotesByCategory(this.category);
            const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);

            const stats = {
                category: this.category,
                totalVotes,
                votes: votes.map(vote => ({
                    ...vote,
                    percentage: totalVotes > 0 ? ((vote.count / totalVotes) * 100).toFixed(1) : 0
                }))
            };

            res.json(stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}