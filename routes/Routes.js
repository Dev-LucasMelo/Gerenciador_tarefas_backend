const express = require('express')
const Router = express.Router()

Router.get('/',(req,res)=>{
    res.json('isso ae')
})



module.exports = Router




