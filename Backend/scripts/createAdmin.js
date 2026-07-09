#!/usr/bin/env node
const connectDB = require('../src/config/db')
const User = require('../src/models/User')
const { signToken } = require('../src/utils/auth')

const run = async () => {
    await connectDB()

    const name = process.argv[2] || 'VKS Admin'
    const email = process.argv[3] || 'admin@vks.com'
    const phone = process.argv[4] || '+919000000000'

    let user = await User.findOne({ email })
    if (!user) {
        user = await User.create({ name, email, phone, role: 'admin', isVerified: true })
        console.log('Admin user created')
    } else {
        if (user.role !== 'admin') {
            user.role = 'admin'
            await user.save()
            console.log('Existing user promoted to admin')
        } else {
            console.log('Admin user already exists')
        }
    }

    const token = signToken(user)
    console.log('\nJWT token (set as authToken in frontend localStorage):\n')
    console.log(token)
    process.exit(0)
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
