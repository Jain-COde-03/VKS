const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema(
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
        quantity: {
            type: Number,
            min: 1,
            default: 1,
        },
    },
    { _id: false }
)

const cartSchema = new mongoose.Schema(
    {
        userKey: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        items: {
            type: [cartItemSchema],
            default: [],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)
