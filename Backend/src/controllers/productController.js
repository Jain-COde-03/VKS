const Product = require('../models/Product')

const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const getProducts = async (req, res, next) => {
    const { category, search } = req.query
    const query = { isActive: true }

    if (category) {
        query.category = new RegExp(`^${escapeRegex(category)}$`, 'i')
    }

    if (search) {
        const searchRegex = new RegExp(escapeRegex(search), 'i')
        query.$or = [
            { title: searchRegex },
            { brand: searchRegex },
            { category: searchRegex },
            { tags: searchRegex },
        ]
    }

    try {
        const products = await Product.find(query).sort({ productId: 1 }).lean()
        res.json({ products })
    } catch (error) {
        next(error)
    }
}

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findOne({ productId: Number(req.params.id), isActive: true }).lean()

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        return res.json({ product })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getProducts,
    getProductById,
}
