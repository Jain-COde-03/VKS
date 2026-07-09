const crypto = require('crypto')
const Razorpay = require('razorpay')

const getRazorpayClient = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
        const error = new Error('Razorpay credentials are not configured')
        error.statusCode = 503
        throw error
    }

    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    })
}

const createPaymentOrder = async (req, res, next) => {
    const { amount, amountPaise, currency = 'INR', receipt } = req.body
    const payableAmount = amountPaise ? Number(amountPaise) : Math.round(Number(amount) * 100)

    if (!payableAmount || payableAmount <= 0) {
        return res.status(400).json({ message: 'A valid amount is required' })
    }

    try {
        const razorpay = getRazorpayClient()
        const order = await razorpay.orders.create({
            amount: payableAmount,
            currency,
            receipt: receipt || `vks_${Date.now()}`,
        })

        return res.status(201).json({
            keyId: process.env.RAZORPAY_KEY_ID,
            order,
        })
    } catch (error) {
        return next(error)
    }
}

const verifyPayment = (req, res) => {
    const {
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
    } = req.body

    if (!orderId || !paymentId || !signature) {
        return res.status(400).json({ message: 'Payment verification payload is incomplete' })
    }

    if (!process.env.RAZORPAY_SECRET) {
        return res.status(503).json({ message: 'Razorpay credentials are not configured' })
    }

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex')

    if (expectedSignature !== signature) {
        return res.status(400).json({ verified: false, message: 'Invalid payment signature' })
    }
    // Optionally, update order payment status if orderNumber was used as receipt
    // The frontend should include an orderNumber or orderId to correlate
    const { orderNumber } = req.body
    ;(async () => {
        if (orderNumber) {
            try {
                const Order = require('../models/Order')
                await Order.findOneAndUpdate({ orderNumber }, { paymentStatus: 'paid', paymentId, paymentProvider: 'razorpay' })
            } catch (err) {
                // ignore
            }
        }
    })()

    return res.json({
        verified: true,
        orderId,
        paymentId,
        orderNumber: orderNumber || null,
    })
}

module.exports = {
    createPaymentOrder,
    verifyPayment,
}
