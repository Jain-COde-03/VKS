const mongoose = require('mongoose')

const RefreshTokenSchema = new mongoose.Schema({
    tokenHash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
})

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema)
