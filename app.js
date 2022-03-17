const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const Router = require('./routes/Routes')

//app
const app = express()

//app use configs 
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended:false }))
app.use(express.static(__dirname + '/public')) //css na pasta public
app.use('/',Router)
app.use(express.json())
app.use(express.Router())
//port 
app.listen(4000 || process.env.PORT, ()=>{
    console.log('rodando na porta 4000')
})