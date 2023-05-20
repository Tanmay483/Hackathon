const multer = require('multer')

const upload = multer({
    storage : multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'./app/Documents')
        },
        filename: function(req,file,cb){
            cb(null, file.fieldname +"-"+ Date.now()+ '.pdf')
        }
    })
}).single('docs')

module.exports = upload