import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    desc: String,
    imagePath: String,
    price: {
        type: Number,
        required: true
    },
    categories: [String],
    status: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {timestamps: true})

const Product = mongoose.model("Product", ProductSchema)

export default Product