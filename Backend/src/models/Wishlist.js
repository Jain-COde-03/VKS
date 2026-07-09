const mongoose = require('mongoose')

const wishlistItemSchema = new mongoose.Schema(
    {
        productId: Number,
        title: String,
        brand: String,
        category: String,
        imageSrc: String,
        price: Number,
        originalPrice: Number,
        unit: String,
        rating: Number,
        discountLabel: String,
        stock: Number,
        tags: [String],
    },
    { _id: false }
)

const wishlistSchema = new mongoose.Schema(
    {
        userKey: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        items: {
            type: [wishlistItemSchema],
            default: [],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Wishlist', wishlistSchema)
