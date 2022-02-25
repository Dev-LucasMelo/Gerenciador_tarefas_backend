const express = require('express')
const Router = express.Router()
const database = require('./../database/database')



Router.get('/datalogin', (req, res) => {
    var login = database.query('select * from login')

    login.then((data) => {
        res.json(data.rows)
    })
   
})

Router.get('/dataplat', (req, res) => {
    //Rota geral da api
    res.json('dados plataforma')
})


module.exports = Router




