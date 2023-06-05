const multer = require('multer')

const image = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './app/Images')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + '.png','.jpg')
        }
    })
}).single('image')

module.exports = image