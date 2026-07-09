const jwt = require('jsonwebtoken')

const signToken = (user) => {
    const secret = process.env.JWT_SECRET
    const expiresIn = process.env.JWT_EXPIRE || '7d'

    if (!secret) {
        throw new Error('JWT_SECRET is not configured')
    }

    return jwt.sign(
        {
            id: user.id,
            sub: user._id?.toString?.() || user.id,
            email: user.email,
            role: user.role,
        },
        secret,
        { expiresIn }
    )
}

module.exports = { signToken }
