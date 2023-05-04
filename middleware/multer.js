const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + file.originalname + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const uploads = multer({ storage: storage });

module.exports = uploads;