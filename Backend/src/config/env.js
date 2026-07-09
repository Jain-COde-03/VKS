require('dotenv').config()

const required = [
    { name: 'MONGODB_URI', critical: true },
    { name: 'JWT_SECRET', critical: true },
]

const optional = [
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'FRONTEND_URL',
]

const missing = []
for (const r of required) {
    if (!process.env[r.name]) missing.push(r.name)
}

if (missing.length) {
    console.error('Missing required environment variables:', missing.join(', '))
    console.error('See Backend/.env.example for the expected variables. Exiting.')
    process.exit(1)
}

for (const name of optional) {
    if (!process.env[name]) {
        console.warn(`Optional env var ${name} is not set`)
    }
}

module.exports = true
