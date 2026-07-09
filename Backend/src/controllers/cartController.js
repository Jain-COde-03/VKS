const Cart = require('../models/Cart')
const Product = require('../models/Product')

const productSnapshot = (product, quantity = 1) => ({
    productId: product.productId,
    title: product.title,
    brand: product.brand,
    category: product.category,
    imageSrc: product.imageSrc,
    price: product.price,
    originalPrice: product.originalPrice,
    unit: product.unit,
    rating: product.rating,
    discountLabel: product.discountLabel,
    stock: product.stock,
    tags: product.tags,
    quantity,
})

const getUserKey = (req) => req.user?.sub || req.user?.id

const getCart = async (userKey) => {
    return Cart.findOneAndUpdate(
        { userKey },
        { $setOnInsert: { items: [] } },
        { new: true, upsert: true }
    )
}

const getCartItems = async (req, res, next) => {
    try {
        const cart = await getCart(getUserKey(req))
        res.json({ items: cart.items })
    } catch (error) {
        next(error)
    }
}

const addCartItem = async (req, res, next) => {
    const { productId, quantity = 1 } = req.body

    try {
        const product = await Product.findOne({ productId: Number(productId), isActive: true }).lean()

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const cart = await getCart(getUserKey(req))
        const existingItem = cart.items.find((item) => item.productId === product.productId)
        cart.items = existingItem
            ? cart.items.map((item) => item.productId === product.productId ? { ...item.toObject(), quantity: item.quantity + Number(quantity) } : item)
            : [...cart.items, productSnapshot(product, Number(quantity))]

        await cart.save()
        return res.status(201).json({ items: cart.items })
    } catch (error) {
        return next(error)
    }
}

const updateCartItem = async (req, res, next) => {
    const { quantity = 1 } = req.body
    const productId = Number(req.params.itemId)

    try {
        const cart = await getCart(getUserKey(req))
        cart.items = Number(quantity) <= 0
            ? cart.items.filter((item) => item.productId !== productId)
            : cart.items.map((item) => item.productId === productId ? { ...item.toObject(), quantity: Number(quantity) } : item)

        await cart.save()
        res.json({ items: cart.items })
    } catch (error) {
        next(error)
    }
}

const clearCart = async (req, res, next) => {
    try {
        const cart = await getCart(getUserKey(req))
        cart.items = []
        await cart.save()
        res.json({ items: cart.items })
    } catch (error) {
        next(error)
    }
}

const removeCartItem = async (req, res, next) => {
    const productId = Number(req.params.itemId)

    try {
        const cart = await getCart(getUserKey(req))
        cart.items = cart.items.filter((item) => item.productId !== productId)
        await cart.save()
        res.json({ items: cart.items })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCartItems,
    addCartItem,
    updateCartItem,
    clearCart,
    removeCartItem,
}
