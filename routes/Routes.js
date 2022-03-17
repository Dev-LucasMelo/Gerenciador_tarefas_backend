const express = require('express')
const Router = express.Router()
const database = require('./../database/database')


//ROTAS DE DADOS

Router.get('/datacadastro', (req, res) => {
    var cadastro = database.query('select * from login')
    cadastro.then((data) => {
        res.json(data.rows)
    })
})

Router.get('/tasks4',(req,res)=>{
    var platdata = database.query('select * from tasks4')
    platdata.then((data)=>{
        res.json(data.rows)
    })
})
    
//ROTAS DE REQUISIÇÕES 

Router.post('/cadastro', (req, res) => {
    //AQUI ADICIONA AO BANCO DE DADOS   
    database.query('insert into login (username,password,email,sexo) values ($1,$2,$3,$4)',[req.body.username,req.body.password,req.body.email,req.body.sex])

    res.redirect('http://localhost:3000/finish')
})


module.exports = Router




