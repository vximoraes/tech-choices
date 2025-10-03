import { VoteRepository } from '../repositories/VoteRepository.js';
import { isValidCategory, isValidOptionForCategory } from '../config/categories.js';

export class VoteService {
    constructor() {
        this.voteRepository = new VoteRepository();
    }

    async getAllCategories() {
        return await this.voteRepository.getAllCategoriesWithVotes();
    }

    async getVotesByCategory(category) {
        if (!isValidCategory(category)) {
            throw new Error('Invalid category');
        }

        const votes = await this.voteRepository.findByCategory(category);
        return votes.map(vote => ({
            option: vote.option,
            count: vote.count
        }));
    }

    async addVote(category, option) {
        if (!isValidCategory(category)) {
            throw new Error('Invalid category');
        }

        if (!isValidOptionForCategory(category, option)) {
            throw new Error(`Invalid option "${option}" for category "${category}"`);
        }

        const updatedVote = await this.voteRepository.incrementVote(category, option);

        if (!updatedVote) {
            throw new Error('Failed to add vote');
        }

        return {
            category: updatedVote.category,
            option: updatedVote.option,
            count: updatedVote.count
        };
    }

    async initializeAllVotes() {
        await this.voteRepository.initializeAllCategories();
    }
}