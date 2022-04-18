const pg = require('pg')

var database = new pg.Client({
    connectionString : process.env.DATABASE_URL,
    ssl : {
        rejectUnauthorized : false
    }
})

  
database.connect()
    
module.exports = database