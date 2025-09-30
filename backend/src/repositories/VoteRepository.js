import { Vote } from '../models/Vote.js';
import { VOTE_CATEGORIES, getAllCategories } from '../config/categories.js';

export class VoteRepository {
    async findByCategory(category) {
        return await Vote.find({ category }).sort({ option: 1 });
    }

    async findByCategoryAndOption(category, option) {
        return await Vote.findOne({ category, option });
    }

    async findAll() {
        return await Vote.find({}).sort({ category: 1, option: 1 });
    }

    async create(category, option, count = 0) {
        const vote = new Vote({ category, option, count });
        return await vote.save();
    }

    async incrementVote(category, option) {
        return await Vote.findOneAndUpdate(
            { category, option },
            { $inc: { count: 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
    }

    async initializeAllCategories() {
        const categories = getAllCategories();

        for (const categoryKey of categories) {
            const categoryInfo = VOTE_CATEGORIES[categoryKey];

            for (const option of categoryInfo.options) {
                const exists = await this.findByCategoryAndOption(categoryKey, option);
                if (!exists) {
                    await this.create(categoryKey, option, 0);
                }
            }
        }
    }

    async getAllCategoriesWithVotes() {
        const allVotes = await this.findAll();
        const categoriesData = {};

        allVotes.forEach(vote => {
            if (!categoriesData[vote.category]) {
                categoriesData[vote.category] = {
                    category: vote.category,
                    name: VOTE_CATEGORIES[vote.category]?.name || vote.category,
                    options: [],
                    route: VOTE_CATEGORIES[vote.category]?.route || `/${vote.category}`
                };
            }

            categoriesData[vote.category].options.push({
                option: vote.option,
                count: vote.count
            });
        });

        return Object.values(categoriesData);
    }
}