const path = require('path')
const DB = require('nedb')
const service = require('feathers-nedb')

module.exports = function configDb (app) {
  const {dbPath} = app.get('config')
  const apiKeys = new DB({
    filename: path.join(dbPath, 'apikeys.db'),
    autoload: true
  })
  app.use('/apikeys', service({Model: apiKeys}))
}