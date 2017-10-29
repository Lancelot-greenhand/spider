const Car = require('../models/car.js')
const express = require('express')
const router = express.Router()

router.get('/get_all_car_data', (req, res) => {
    Car.find((err, result) => {
        if (err) {
          res.json({
              err
          })
          return
        }
        res.json({
            err: null,
            data: result
        })
    })
})

module.exports = router