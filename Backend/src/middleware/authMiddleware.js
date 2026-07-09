const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null

    if (!token) {
        res.status(401)
        return next(new Error('Authentication token required'))
    }

    try {
        const secret = process.env.JWT_SECRET
        if (!secret) {
            res.status(503)
            return next(new Error('JWT_SECRET is not configured'))
        }

        req.user = jwt.verify(token, secret)
        return next()
    } catch (error) {
        res.status(401)
        return next(new Error('Invalid or expired token'))
    }
}

module.exports = { protect }
