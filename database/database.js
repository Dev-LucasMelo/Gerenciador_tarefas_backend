const pg = require('pg') //postgres database 

const database =  new pg.Client ({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: '5432',
    database: 'gerenciadorteste'
    
    //Lembrar da autorização ssl na hora da hospedagem 
})

database.connect()
    
module.exports = database