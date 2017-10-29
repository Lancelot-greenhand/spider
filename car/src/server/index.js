const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3030
const carRouter = require('../router/car.js')

app.use(bodyParser.json())
app.use(carRouter)


app.listen(port)
console.log(`spider server is running at ${port}`)
