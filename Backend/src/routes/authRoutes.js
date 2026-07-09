const express = require('express')
const { body } = require('express-validator')
const { login, register, refresh, logout, me } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')
const { validateRequest } = require('../middleware/validationMiddleware')

const router = express.Router()

router.post('/login', [body('email').isEmail().withMessage('A valid email is required')], validateRequest, login)
router.post('/register', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
], validateRequest, register)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.get('/me', protect, me)

router.get('/me', protect, me)
router.post('/refresh', async (req, res, next) => {
	try {
		const token = req.cookies?.refreshToken
		if (!token) return res.status(401).json({ message: 'Refresh token missing' })

		const stored = await RefreshToken.findOne({ revoked: false }).sort({ createdAt: -1 })
		// naive: find any token for user — better: store by userId or tokenHash index
		const matched = stored && (await verifyHash(token, stored.tokenHash))
		if (!matched) return res.status(401).json({ message: 'Invalid refresh token' })

		const user = await User.findById(stored.userId)
		if (!user) return res.status(401).json({ message: 'User not found' })

		// rotate
		stored.revoked = true
		await stored.save()

		const plain = genRefreshToken()
		const tokenHash = await hashToken(plain)
		const expiresAt = new Date(Date.now() + (parseInt(process.env.REFRESH_TOKEN_DAYS || '30', 10) * 24 * 60 * 60 * 1000))
		await RefreshToken.create({ tokenHash, userId: user._id, expiresAt })
		setRefreshCookie(res, plain)

		const accessToken = signToken(user)
		return res.json({ token: accessToken, user: user.toObject() })
	} catch (err) {
		return next(err)
	}
})
router.post('/logout', async (req, res, next) => {
	try {
		const token = req.cookies?.refreshToken
		if (token) {
			// revoke all matching tokens (best-effort)
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
})

module.exports = router
