const express = require('express')
const { body } = require('express-validator')
const { protect } = require('../middleware/authMiddleware')
const {
    createPaymentOrder,
    verifyPayment,
} = require('../controllers/paymentController')
const { validateRequest } = require('../middleware/validationMiddleware')

const router = express.Router()

router.post(
    '/create-order',
    [
        body('amount').optional().isNumeric().withMessage('Amount must be numeric'),
        body('amountPaise').optional().isInt({ min: 1 }).withMessage('amountPaise must be an integer'),
    ],
    validateRequest,
    createPaymentOrder
)
router.post(
    '/verify',
    [
        body('razorpay_order_id').notEmpty().withMessage('Order ID is required'),
        body('razorpay_payment_id').notEmpty().withMessage('Payment ID is required'),
        body('razorpay_signature').notEmpty().withMessage('Signature is required'),
    ],
    validateRequest,
    verifyPayment
)

module.exports = router
