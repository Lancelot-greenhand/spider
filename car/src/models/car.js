var mongoose = require('../db/db.js')
var Car = mongoose.Schema({
    id: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    href: {
        type: String
    },
    minPrice: {
        type: Number
    },
    date: {
        type: Date,
        required: true
    }
})
var Model = mongoose.model('car', Car)
module.exports = Model