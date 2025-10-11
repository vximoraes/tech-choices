import { VoteService } from '../services/VoteService.js';
import { ZodError } from 'zod';
import { z } from 'zod';

const GithubGitlabVoteSchema = z.object({
    option: z.enum(['github', 'gitlab'], {
        message: 'Option must be either "github" or "gitlab"'
    })
});

export class GithubGitlabController {
    constructor() {
        this.voteService = new VoteService();
        this.category = 'github-gitlab';
    }

    // GET /api/github-gitlab/votes - Obter votos do GitHub vs GitLab
    async getVotes(req, res) {
        try {
            const votes = await this.voteService.getVotesByCategory(this.category);
            res.json(votes);
        } catch (error) {
            console.error('Error fetching votes:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // POST /api/github-gitlab/vote - Votar no GitHub vs GitLab
    async addVote(req, res) {
        try {
            const { option } = GithubGitlabVoteSchema.parse(req.body);
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

            console.error('Error adding github-gitlab vote:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to add github-gitlab vote'
            });
        }
    }

    // GET /api/github-gitlab/stats - Estatísticas específicas do GitHub vs GitLab
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