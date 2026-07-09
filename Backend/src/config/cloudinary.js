const { v2: cloudinary } = require('cloudinary')

const cloudinaryFolder = process.env.CLOUDINARY_FOLDER || 'vks'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const assertCloudinaryConfig = () => {
    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        const error = new Error('Cloudinary credentials are not configured')
        error.statusCode = 503
        throw error
    }
}

module.exports = {
    assertCloudinaryConfig,
    cloudinary,
    cloudinaryFolder,
}
