const morgan = require('morgan')
const winston = require('winston')

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple()
            ),
        }),
    ],
})

const requestLogger = morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
})

module.exports = { logger, requestLogger }
