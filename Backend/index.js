// Validate environment early
require('./src/config/env')
const app = require('./src/app')
const connectDB = require('./src/config/db')
const seedDatabase = require('./src/data/seedDatabase')

const port = process.env.PORT || 5000
const host = process.env.HOST || '127.0.0.1'

const startServer = async () => {
    try {
        await connectDB()
        await seedDatabase()

        app.listen(port, host, () => {
            console.log(`VKS API running on http://${host}:${port}`)
        })
    } catch (error) {
        console.error('Failed to start VKS API:', error.message)
        process.exit(1)
    }
}

startServer()
