const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const { signToken } = require('../utils/auth')
const { genRefreshToken, hashToken, verifyHash } = require('../utils/tokens')

const REFRESH_TOKEN_TTL_DAYS = parseInt(process.env.REFRESH_TOKEN_DAYS || '30', 10)

const setRefreshCookie = (res, token) => {
    const maxAge = REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge,
    })
}

const login = async (req, res, next) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email: String(email || '').toLowerCase() })

        if (!user) {
            return res.status(401).json({ message: 'Invalid email for demo login' })
        }

        const accessToken = signToken(user)

        // create refresh token
        const plain = genRefreshToken()
        const tokenHash = await hashToken(plain)
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000)

        await RefreshToken.create({ tokenHash, userId: user._id, expiresAt })
        setRefreshCookie(res, plain)

        return res.json({ user: user.toObject(), token: accessToken })
    } catch (error) {
        return next(error)
    }
}

const register = async (req, res, next) => {
    const { name, email, phone } = req.body

    if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Name, email, and phone are required' })
    }

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() })
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered' })
        }

        const user = await User.create({
            name,
            email,
            phone,
            role: 'customer',
        })

        const accessToken = signToken(user)
        const plain = genRefreshToken()
        const tokenHash = await hashToken(plain)
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000)
        await RefreshToken.create({ tokenHash, userId: user._id, expiresAt })
        setRefreshCookie(res, plain)

        return res.status(201).json({ user, token: accessToken })
    } catch (error) {
        return next(error)
    }
}

const refresh = async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken
        if (!token) return res.status(401).json({ message: 'Refresh token missing' })

        const stored = await RefreshToken.findOne({ revoked: false }).sort({ createdAt: -1 })
        const matched = stored && (await verifyHash(token, stored.tokenHash))
        if (!matched) return res.status(401).json({ message: 'Invalid refresh token' })

        const user = await User.findById(stored.userId)
        if (!user) return res.status(401).json({ message: 'User not found' })

        // rotate
        stored.revoked = true
        await stored.save()

        const plain = genRefreshToken()
        const tokenHash = await hashToken(plain)
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000)
        await RefreshToken.create({ tokenHash, userId: user._id, expiresAt })
        setRefreshCookie(res, plain)

        const accessToken = signToken(user)
        return res.json({ token: accessToken, user: user.toObject() })
    } catch (err) {
        return next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken
        if (token) {
            const tokens = await RefreshToken.find({ revoked: false })
            for (const t of tokens) {
                if (await verifyHash(token, t.tokenHash)) {
                    t.revoked = true
                    await t.save()
                }
            }
        }
        res.clearCookie('refreshToken')
        return res.json({ ok: true })
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    login,
    register,
    refresh,
    logout,
}

const me = async (req, res, next) => {
    try {
        const userId = req.user?.sub || req.user?.id
        if (!userId) return res.status(401).json({ message: 'Not authenticated' })

        const user = await User.findById(userId).lean()
        if (!user) return res.status(404).json({ message: 'User not found' })

        return res.json({ user })
    } catch (err) {
        return next(err)
    }
}

module.exports.me = me


