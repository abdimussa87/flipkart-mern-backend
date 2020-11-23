import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
    ,
    price: {
        type: Number,
        required: true
    },
    offer: {
        type: Number
    },
    quantity: { type: Number, default: 1 },
    productPictures: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId, ref: 'User'
            },
            review: String
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    updatedAt: Date

}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);