const config = require('../config')
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:20507/spiderdata',
    user = 'yangrw2017',
    pass = 'luyangrw!2@17-'
if (config.isProd) {
    mongoose.connect(DB_URL, {
        user, 
        pass,
        useMongoClient: true
    })
} else {
    mongoose.connect(DB_URL, {
        useMongoClient: true
    })
}

var db = mongoose.connection
db.on('connected', function(){
    console.log(`MongoConnection is open to ${DB_URL}`)
})
db.on('err', function(err){
  console.log(`mongo connection err: ${err}`)
})
db.on('disconnected', function(){
    console.log('mongoDB disconnected')
})

module.exports = mongoose