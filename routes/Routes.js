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

//rotas de usuarios 
Router.get(`/tasksuser/:username`, (req, res) => {

    var tasksuser = database.query(`select * from tasks${req.params.username}`)
    tasksuser.then((data) => {
        res.json(data.rows)
    })
})

//cadastro
Router.post('/cadastro', (req, res) => {
    //AQUI ADICIONA AO BANCO DE DADOS   
    database.query('insert into login (username,password,email,sexo) values ($1,$2,$3,$4)', [req.body.username, req.body.password, req.body.email, req.body.sex])

    //cria base de dados para plataforma
    var indentname = req.body.username.replace(/\s/g, '').toLowerCase()

    database.query(`create table tasks${indentname} ( 
        id serial,
        tittletask varchar,
        contenttask varchar,
        completed boolean
    ) `)


    res.redirect('http://localhost:3000/finish')
})

//Criação de tasks 
Router.post(`/createtask`, (req, res) => {

    const username = req.body.username.replace(/\s/g, '').toLowerCase()

    database.query(`
            insert into tasks${username} (tittletask,contenttask,completed)
            values ($1,$2,$3)        
        `, [req.body.createtittle, req.body.createcontent, req.body.createcompletedtask])

    res.redirect(`http://localhost:3000/plat/${req.body.rotaderetorno}`)
})

// Atualização de tasks 
Router.post(`/edittask/:username`, (req, res) => {

    //tittle 
    database.query(`
        update tasks${req.params.username} 
        set tittletask = $1
        where id = $2       
        `, [req.body.edittittle, req.body.idtask])

    //content
    database.query(`
        update tasks${req.params.username} 
        set contenttask = $1
        where id = $2       
        `, [req.body.editcontent, req.body.idtask])

    //completed
    database.query(`
        update tasks${req.params.username} 
        set completed = $1
        where id = $2       
        `, [req.body.editcompletedtask, req.body.idtask])

    res.redirect(`http://localhost:3000/plat/${req.body.rotaretorno}`)
})

//Delete tasks

Router.post(`/delete/:username`, (req, res) => {

    database.query(`
                delete from tasks${req.params.username} 
                where id = $1
            `, [req.body.deletetaskid])


    res.redirect(`http://localhost:3000/plat/${req.body.iduser}`)
})


module.exports = Router