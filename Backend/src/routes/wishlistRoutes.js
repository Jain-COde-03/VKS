const express = require('express')
const { body, param } = require('express-validator')
const { protect } = require('../middleware/authMiddleware')
const {
    getWishlist,
    addWishlistItem,
    removeWishlistItem,
} = require('../controllers/wishlistController')
const { validateRequest } = require('../middleware/validationMiddleware')

const router = express.Router()

router.use(protect)
router.get('/', getWishlist)
router.post(
    '/add',
    [body('productId').isInt().withMessage('productId must be an integer')],
    validateRequest,
    addWishlistItem
)
router.delete('/:productId', [param('productId').isInt().withMessage('Product ID must be an integer')], validateRequest, removeWishlistItem)

module.exports = router
