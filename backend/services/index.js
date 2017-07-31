const configDb = require('./db')
const cs = require('./cors')
const cors = require('cors')

module.exports = () => function () {
  configDb(this)
  this.options('/serviceCors', cors())
  this.use('/serviceCors', new cs.CORService(), cs.updateContentType)
  // this.options('/cors', cors())
}
