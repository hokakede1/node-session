const massive = require('massive');

let dbInstance;

massive('postgres://lterafkrggrvlz:9f8e45e116193e4a8b9b35ef7b8bccfd97f578be0e493fc0e1f8b4a6161ce9a3@ec2-50-16-196-57.compute-1.amazonaws.com:5432/d1ie5otd71r03i?ssl=true')
.then(db => {
    dbInstance = db
    console.log('db is connected')
})

function insertDatabase(req, res, next){
    if(!dbInstance){
        return res.status(500).send('Db is not defined')
    } else {
        req.database = dbInstance
        next()
    }
}

module.exports = {
    insertDatabase
}



