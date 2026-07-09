const { assertCloudinaryConfig, cloudinary, cloudinaryFolder } = require('../config/cloudinary')

const uploadBufferToCloudinary = (fileBuffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                reject(error)
                return
            }

            resolve(result)
        })

        stream.end(fileBuffer)
    })
}

const uploadImage = async (req, res, next) => {
    try {
        assertCloudinaryConfig()

        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' })
        }

        const result = await uploadBufferToCloudinary(req.file.buffer, {
            folder: cloudinaryFolder,
            resource_type: 'image',
            use_filename: true,
            unique_filename: true,
        })

        return res.status(201).json({
            image: {
                url: result.secure_url,
                publicId: result.public_id,
                folder: cloudinaryFolder,
                width: result.width,
                height: result.height,
                format: result.format,
                bytes: result.bytes,
            },
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    uploadImage,
}
