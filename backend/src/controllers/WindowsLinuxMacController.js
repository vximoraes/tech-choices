import { VoteService } from '../services/VoteService.js';
import { ZodError } from 'zod';
import { z } from 'zod';

const WindowsLinuxMacVoteSchema = z.object({
    option: z.enum(['windows', 'linux', 'macos'], {
        message: 'Option must be one of: "windows", "linux", or "macos"'
    })
});

export class WindowsLinuxMacController {
    constructor() {
        this.voteService = new VoteService();
        this.category = 'windows-linux-mac';
    }

    // GET /api/windows-linux-mac/votes - Obter votos do Windows vs Linux vs Mac
    async getVotes(req, res) {
        try {
            const votes = await this.voteService.getVotesByCategory(this.category);
            res.json(votes);
        } catch (error) {
            console.error('Error fetching votes:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // POST /api/windows-linux-mac/vote - Votar no Windows vs Linux vs Mac
    async addVote(req, res) {
        try {
            const { option } = WindowsLinuxMacVoteSchema.parse(req.body);
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

            console.error('Error adding windows-linux-mac vote:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to add windows-linux-mac vote'
            });
        }
    }

    // GET /api/windows-linux-mac/stats - Estatísticas específicas do Windows vs Linux vs Mac
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