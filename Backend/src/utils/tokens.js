const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const genRefreshToken = () => {
    return crypto.randomBytes(48).toString('hex')
}

const hashToken = async (token) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(token, salt)
}

const verifyHash = async (token, hash) => {
    return bcrypt.compare(token, hash)
}

module.exports = { genRefreshToken, hashToken, verifyHash }
