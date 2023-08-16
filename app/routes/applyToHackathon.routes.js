module.exports = (app)=>{
    const apply = require('../controller/applyToHackathon.controller')
    var router = require("express").Router();
    // post
    router.post('/',apply.create)

    router.post('/list',apply.find)

    app.use('/api/apply',router)
}