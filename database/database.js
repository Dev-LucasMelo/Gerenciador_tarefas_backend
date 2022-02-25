const pg = require('pg') //postgres database 

const database = new pg.Client ({
    user: 'postgres',
    password: 'Lm07112002',
    host: 'localhost',
    port: '5432',
    database: 'gerenciadorteste'
    
    //Lembrar da autorização ssl na hora da hospedagem 
})

database.connect()
    
module.exports = database