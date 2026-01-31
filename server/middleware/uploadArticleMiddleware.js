const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); //existing config file

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio/articles', //folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }] //auto-resize (optional though)
    },
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } //5MB limit
});

module.exports = upload;