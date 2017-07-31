const path = require('path')
const ONE_DAY = 60 * 60 * 24 * 1000

module.exports = {
  auth: {
    secret: 'super secret',
    cookie: {
      enabled: true,
      httpOnly: false,
      maxAge: ONE_DAY,
      secure: process.env.NODE_ENV === 'production'
    }
  },
  port: 8090,
  dbPath: path.join(__dirname,'..', 'dbs')
}
