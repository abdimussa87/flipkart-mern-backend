import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String
    },
    image: {
        type: String,
    },
    parentId: { type: String }
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema);