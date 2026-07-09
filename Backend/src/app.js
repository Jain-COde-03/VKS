require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const apiRoutes = require('./routes')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')

const app = express()

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'

const { securityMiddleware } = require('./middleware/securityMiddleware')
const { requestLogger } = require('./middleware/logger')

app.use(requestLogger)
app.use(cors({ origin: allowedOrigin, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(securityMiddleware)

app.get('/', (req, res) => {
    res.json({
        name: 'VKS Backend API',
        status: 'ok',
        version: '1.0.0',
    })
})

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    })
})

app.use('/api', apiRoutes)
app.use(notFound)
app.use(errorHandler)

module.exports = app
