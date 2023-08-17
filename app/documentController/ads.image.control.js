const multer = require('multer');

const image = multer({
    storage: multer.diskStorage({
        destination : (req,file,cb) =>{
            cb(null, './app/adImage')
        },
        filename : (req,file,cb)=>{
            cb(null, file.fieldname + "-" + Date.now() + '.png')
        }
    })
}).single('img')

module.exports = image