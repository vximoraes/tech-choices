import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['front-back', 'js-ts', 'sql-nosql', 'github-gitlab', 'windows-linux-mac']
    },
    option: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

VoteSchema.index({ category: 1, option: 1 }, { unique: true });

export const Vote = mongoose.model('Vote', VoteSchema);