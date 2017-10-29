


const args = process.argv.slice(2)
const operation = args[0]
if (operation === 'get-car-data') {
  const startRequest = require('./src/fetchData.js')
  startRequest()
  return
}

if (operation ==='start-service') {
const server = require('./src/server')
  return
}



