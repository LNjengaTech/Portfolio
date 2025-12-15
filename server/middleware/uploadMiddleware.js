const multer = require('multer');
const path = require('path');

//storage configurations
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/projects'); // Create this folder
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//checking and filtering file types
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, //5MB limit
});

module.exports = upload;