const Product = require('../models/Product')
const User = require('../models/User')
const { products, users } = require('./demoStore')

const seedDatabase = async () => {
    const productCount = await Product.countDocuments()
    if (productCount === 0) {
        await Product.insertMany(products.map((product) => ({
            ...product,
            productId: product.id,
            brand: product.brand || 'VKS Select',
            originalPrice: product.originalPrice || product.price,
            unit: product.unit || '1 pack',
            tags: product.tags || [],
        })))
        console.log(`Seeded ${products.length} products`)
    }

    const userCount = await User.countDocuments()
    if (userCount === 0) {
        await User.insertMany(users.map((user) => ({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isVerified: user.isVerified,
        })))
        console.log(`Seeded ${users.length} users`)
    }
}

module.exports = seedDatabase
