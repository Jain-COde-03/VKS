const express = require('express')
const { body, param } = require('express-validator')
const { protect } = require('../middleware/authMiddleware')
const {
    getOrders,
    createOrder,
    createGuestOrder,
    getOrderByNumber,
} = require('../controllers/orderController')
const { validateRequest } = require('../middleware/validationMiddleware')

const router = express.Router()

router.get('/', protect, getOrders)
router.post(
    '/',
    protect,
    [
        body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
        body('paymentMethod').optional().isIn(['cod', 'online']).withMessage('Payment method must be cod or online'),
    ],
    validateRequest,
    createOrder
)
router.post(
    '/guest',
    [
        body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
        body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
    ],
    validateRequest,
    createGuestOrder
)
router.get('/:orderNumber', [param('orderNumber').notEmpty().withMessage('Order number is required')], validateRequest, getOrderByNumber)

module.exports = router
