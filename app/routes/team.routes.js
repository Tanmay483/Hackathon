module.exports = app =>{
    const team = require('../controller/team.controller')
    const router = require('express').Router();

    //create
    router.post('/', team.create);

    //getall
    router.get('/', team.findAll);

    //get by id
    router.get('/:t_Id', team.findId);

    //update
    router.put('/:t_Id', team.update);

    //delete
    router.delete('/:t_Id', team.delete);

    app.use('/api/team',router)
}