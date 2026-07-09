const Cart = require('../models/Cart')
const Order = require('../models/Order')

const getUserKey = (req) => req.user?.sub || req.user?.id

const createOrderPayload = ({ userKey, cartItems, shippingAddress, paymentMethod, paymentId, paymentProvider }) => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const deliveryFee = subtotal > 499 ? 0 : 30
    const now = Date.now()

    return {
        userKey,
        orderNumber: `VKS-${new Date().getFullYear()}-${String(now).slice(-5)}`,
        items: cartItems.map((item) => ({
            productId: item.productId,
            title: item.title,
            imageSrc: item.imageSrc,
            quantity: item.quantity,
            unit: item.unit,
            price: item.price,
            total: item.price * item.quantity,
        })),
        subtotal,
        deliveryFee,
        discount: 0,
        totalAmount: subtotal + deliveryFee,
        shippingAddress,
        orderStatus: 'placed',
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        paymentMethod: paymentMethod || 'cod',
        paymentId,
        paymentProvider,
    }
}

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userKey: getUserKey(req) }).sort({ createdAt: -1 }).lean()
        res.json({ orders })
    } catch (error) {
        next(error)
    }
}

const createOrder = async (req, res, next) => {
    try {
        const userKey = getUserKey(req)
        const cart = await Cart.findOne({ userKey })
        const cartItems = cart?.items || []

        if (!cartItems.length) {
            return res.status(400).json({ message: 'Cart is empty' })
        }

        const payload = createOrderPayload({
            userKey,
            cartItems,
            shippingAddress: req.body.shippingAddress || {},
            paymentMethod: req.body.paymentMethod || 'cod',
            paymentId: req.body.paymentId,
            paymentProvider: req.body.paymentProvider,
        })

        const order = await Order.create(payload)
        cart.items = []
        await cart.save()

        return res.status(201).json({ order })
    } catch (error) {
        return next(error)
    }
}

const createGuestOrder = async (req, res, next) => {
    try {
        const items = req.body.items || []
        if (!items.length) {
            return res.status(400).json({ message: 'Order items are required for guest checkout' })
        }

        const userKey = `guest:${Date.now()}:${Math.floor(Math.random() * 10000)}`
        const payload = createOrderPayload({
            userKey,
            cartItems: items,
            shippingAddress: req.body.shippingAddress || {},
            paymentMethod: req.body.paymentMethod || 'cod',
            paymentId: req.body.paymentId,
            paymentProvider: req.body.paymentProvider,
        })

        const order = await Order.create(payload)
        return res.status(201).json({ order })
    } catch (error) {
        return next(error)
    }
}

const getOrderByNumber = async (req, res, next) => {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderNumber }).lean()

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        return res.json({ order })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getOrders,
    createOrder,
    createGuestOrder,
    getOrderByNumber,
}
