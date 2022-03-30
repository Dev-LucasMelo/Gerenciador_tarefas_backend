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


var datalogin = database.query('select * from login')

datalogin.then((data) => {

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


//REQUISIÇÕES 

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
datalogin.then((data)=>{

var rotascreate = data.rows

rotascreate.forEach((i) =>{
    const username = i.username.replace(/\s/g, '').toLowerCase()

    Router.post(`/createtask${username}`,(req,res)=>{

        database.query(`
            insert into tasks${username} (tittletask,contenttask,completed)
            values ($1,$2,$3)        
        `,[req.body.createtittle,req.body.createcontent,req.body.createcompletedtask])

        res.redirect(`http://localhost:3000/plat/${req.body.rotaderetorno}`)
    })
})

})



// Atualização de tasks 
datalogin.then((data)=>{

var rotas = data.rows

rotas.forEach((i)=>{
    const username = i.username.replace(/\s/g, '').toLowerCase()


    Router.post(`/edit${username}`,(req,res)=>{
       
        //tittle 
        database.query(`
        update tasks${username} 
        set tittletask = $1
        where id = $2       
        `, [req.body.edittittle,req.body.idtask])

        //content
        database.query(`
        update tasks${username} 
        set contenttask = $1
        where id = $2       
        `, [req.body.editcontent,req.body.idtask])

        //completed
        database.query(`
        update tasks${username} 
        set completed = $1
        where id = $2       
        `, [req.body.editcompletedtask,req.body.idtask])
        res.redirect(`http://localhost:3000/plat/${req.body.iduser}`)
    })
})
})


module.exports = Router