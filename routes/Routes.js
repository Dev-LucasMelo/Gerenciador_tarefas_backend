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

var teste = database.query('select * from login')

teste.then((data) => {

    var rotasdeuser = data.rows

    rotasdeuser.forEach((item) => {

        const username = item.username.replace(/\s/g, '').toLowerCase()

        Router.get(`/tasks${username}`, (req, res) => {
            var tasksuser = database.query(`select * from tasks${username}`)
            tasksuser.then((data) => {
                res.json(data.rows)
            })
        })

    })
})




//ROTAS DE REQUISIÇÕES 

Router.post('/cadastro', (req, res) => {
    //AQUI ADICIONA AO BANCO DE DADOS   
    database.query('insert into login (username,password,email,sexo) values ($1,$2,$3,$4)', [req.body.username, req.body.password, req.body.email, req.body.sex])

    database.query(`create table tasks${req.body.username} ( 
        id serial,
        tittletask varchar,
        contenttask varchar,
        completed boolean
    ) `)

    res.redirect('http://localhost:3000/finish')
})



module.exports = Router




