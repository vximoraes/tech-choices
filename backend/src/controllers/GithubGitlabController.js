import { VoteService } from '../services/VoteService.js';
import { getCategoryInfo, isValidOptionForCategory } from '../config/categories.js';

export class GithubGitlabController {
    constructor() {
        this.voteService = new VoteService();
        this.categoryId = 'github-gitlab';
    }

    // GET /api/github-gitlab/votes - Obter votos do GitHub vs GitLab
    async getVotes(req, res) {
        try {
            const votes = await this.voteService.getVotesByCategory(this.categoryId);
            res.json(votes);
        } catch (error) {
            console.error('Error fetching votes:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // POST /api/github-gitlab/vote - Votar no GitHub vs GitLab
    async addVote(req, res) {
        try {
            const { option } = req.body;

            if (!option || typeof option !== 'string') {
                return res.status(400).json({ error: 'Option is required and must be a string' });
            }

            if (!isValidOptionForCategory(this.categoryId, option)) {
                const categoryInfo = getCategoryInfo(this.categoryId);
                return res.status(400).json({
                    error: 'Invalid option for this category',
                    validOptions: categoryInfo?.options || []
                });
            }

            const vote = await this.voteService.addVote(this.categoryId, option);
            res.status(201).json(vote);
        } catch (error) {
            console.error('Error adding vote:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // GET /api/github-gitlab/stats - Estatísticas específicas do GitHub vs GitLab
    async getStats(req, res) {
        try {
            const votes = await this.voteService.getVotesByCategory(this.categoryId);
            const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);

            const stats = {
                category: this.categoryId,
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