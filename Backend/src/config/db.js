const mongoose = require('mongoose')

const connectDB = async () => {
    const uri = process.env.MONGODB_URI

    if (!uri) {
        throw new Error('MONGODB_URI is not configured')
    }

    mongoose.set('strictQuery', true)

    const connection = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
    })
    console.log(`MongoDB connected: ${connection.connection.host}`)

    return connection
}

module.exports = connectDB
