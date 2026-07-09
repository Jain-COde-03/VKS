const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema(
    {
        productId: Number,
        title: String,
        imageSrc: String,
        quantity: Number,
        unit: String,
        price: Number,
        total: Number,
    },
    { _id: false }
)

const orderSchema = new mongoose.Schema(
    {
        userKey: {
            type: String,
            required: true,
            index: true,
        },
        orderNumber: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        items: {
            type: [orderItemSchema],
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
        },
        deliveryFee: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            fullName: String,
            phone: String,
            addressLine1: String,
            city: String,
            state: String,
            pincode: String,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed', 'refunded'],
            default: 'pending',
        },
        paymentMethod: {
            type: String,
            default: 'cod',
        },
        paymentId: {
            type: String,
        },
        paymentProvider: {
            type: String,
        },
        orderStatus: {
            type: String,
            enum: ['placed', 'packed', 'out_for_delivery', 'delivered', 'cancelled'],
            default: 'placed',
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
