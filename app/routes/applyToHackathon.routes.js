module.exports = (app)=>{
    const apply = require('../controller/applyToHackathon.controller')
    var router = require("express").Router();

    router.post('/',apply.create)

    app.use('/api/apply',router)
}