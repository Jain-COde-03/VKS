const express = require('express')
const {
    getCartItems,
    addCartItem,
    updateCartItem,
    clearCart,
    removeCartItem,
} = require('../controllers/cartController')

const router = express.Router()

router.get('/', getCartItems)
router.post('/add', addCartItem)
router.put('/:itemId', updateCartItem)
router.delete('/clear/all', clearCart)
router.delete('/:itemId', removeCartItem)

module.exports = router
