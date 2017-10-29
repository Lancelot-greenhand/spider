const superagent = require('superagent')
require('superagent-charset')(superagent)
const cheerio = require('cheerio')
const baseURL = 'http://www.autohome.com.cn'
const fetchUrl = 'http://www.autohome.com.cn/692/price.html' //车型
const priceURL = 'http://dealer.api.autohome.com.cn/dealerrest/price/GetMinPriceBySpecSimple'
const cityId = '320100'
const _appId = 'cms'
const Car = require('./models/car.js')
const db = require('./db/db.js')
function startRequest(url) {
  let date = new Date()
  console.log(date, 'fetch a4 data')
  if (url === undefined) {
      url = fetchUrl
  }
  fetchData(url)
}
function fetchData (url) {
    let carList = []
  superagent
    .get(url)
    .charset('gbk')
    .end((err, res) => {
      if(err){return}
      var $ = cheerio.load(res.text, {decodeEntities: false})
      $('#speclist .interval01 ul li').each((idx, ele) => {
          let $ele = $(ele)
          let title_1 = $ele.find('a')[0]
          let title = $(title_1).text()
          let href = baseURL + $(title_1).attr('href')
          let idReg = /spec\/(\d+)\//
          let id = href.match(idReg)[1]
          let carData = {
              id,
              title,
              href
          }
          carList.push(carData)
      })
      let SpecIds = carList.reduce((pre, cur) => {
        return pre + cur.id + ','
      }, '')
      SpecIds = SpecIds.substring(0, SpecIds.length - 1)
      superagent.get(priceURL)
        .query({_appId})
        .query({cityId})
        .query({SpecIds})
        .end((err, res) => {
          if(err){return}
          let result = JSON.parse(res.text)
          let priceList = result.result && result.result.list || []
          let date = Date.now()
          carList = carList.map((carData) => {
            priceList.some(function(element) {
                if (element.SpecId + '' === carData.id) {
                    carData.minPrice = element.MinPrice
                    return true
                }
            })
            carData.date = date
            return carData
          })
          writeInExcel(carList)
        })
  })
}
function writeInExcel (data) {
    Car.create(data, (err) => {
        if (err) {
          console.log('插入数据库错误',err)
        }
        db.disconnect()
    })
  }

module.exports = startRequest