const express = require('express')

const authRoutes = require('./authRoutes')
const cartRoutes = require('./cartRoutes')
const orderRoutes = require('./orderRoutes')
const paymentRoutes = require('./paymentRoutes')
const productRoutes = require('./productRoutes')
const uploadRoutes = require('./uploadRoutes')
const wishlistRoutes = require('./wishlistRoutes')
const { protect } = require('../middleware/authMiddleware')
const adminController = require('../controllers/adminController')
const { createStream, subscribe } = require('../utils/sse')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/cart', protect, cartRoutes)
router.use('/orders', orderRoutes)
router.use('/payments', protect, paymentRoutes)
router.use('/products', productRoutes)
router.use('/upload', uploadRoutes)
router.use('/wishlist', protect, wishlistRoutes)

// Admin routes
router.get('/admin/orders', protect, adminController.listOrders)
router.patch('/admin/orders/:orderNumber', protect, adminController.updateOrderStatus)

// SSE endpoint for order updates. Public — uses orderNumber as identifier.
router.get('/orders/:orderNumber/stream', (req, res) => {
	const { orderNumber } = req.params
	const stream = createStream(res)
	const unsubscribe = subscribe(orderNumber, stream)

	req.on('close', () => {
		unsubscribe()
	})
})

module.exports = router
