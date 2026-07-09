const Order = require('../models/Order')
const { broadcast } = require('../utils/sse')

const listOrders = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            res.status(403)
            return next(new Error('Admin access required'))
        }

        const orders = await Order.find().sort({ createdAt: -1 }).lean()
        return res.json({ orders })
    } catch (err) {
        return next(err)
    }
}

const updateOrderStatus = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            res.status(403)
            return next(new Error('Admin access required'))
        }

        const { orderNumber } = req.params
        const { orderStatus, paymentStatus } = req.body

        const update = {}
        if (orderStatus) update.orderStatus = orderStatus
        if (paymentStatus) update.paymentStatus = paymentStatus

        const order = await Order.findOneAndUpdate({ orderNumber }, { $set: update }, { new: true }).lean()
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        // Broadcast update to any subscribed trackers
        try {
            broadcast(orderNumber, 'order-updated', order)
        } catch (e) {
            console.warn('SSE broadcast failed', e.message)
        }

        return res.json({ order })
    } catch (err) {
        return next(err)
    }
}

module.exports = { listOrders, updateOrderStatus }
