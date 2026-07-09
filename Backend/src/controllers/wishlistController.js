const Product = require('../models/Product')
const Wishlist = require('../models/Wishlist')

const productSnapshot = (product) => ({
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
})

const getUserKey = (req) => req.user?.sub || req.user?.id

const getWishlist = async (userKey) => {
    return Wishlist.findOneAndUpdate(
        { userKey },
        { $setOnInsert: { items: [] } },
        { new: true, upsert: true }
    )
}

const getWishlistItems = async (req, res, next) => {
    try {
        const wishlist = await getWishlist(getUserKey(req))
        res.json({ items: wishlist.items })
    } catch (error) {
        next(error)
    }
}

const addWishlistItem = async (req, res, next) => {
    try {
        const product = await Product.findOne({ productId: Number(req.body.productId), isActive: true }).lean()

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const wishlist = await getWishlist(getUserKey(req))
        if (!wishlist.items.some((item) => item.productId === product.productId)) {
            wishlist.items = [...wishlist.items, productSnapshot(product)]
            await wishlist.save()
        }

        return res.status(201).json({ items: wishlist.items })
    } catch (error) {
        return next(error)
    }
}

const removeWishlistItem = async (req, res, next) => {
    const productId = Number(req.params.productId)

    try {
        const wishlist = await getWishlist(getUserKey(req))
        wishlist.items = wishlist.items.filter((item) => item.productId !== productId)
        await wishlist.save()
        res.json({ items: wishlist.items })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getWishlist: getWishlistItems,
    addWishlistItem,
    removeWishlistItem,
}
