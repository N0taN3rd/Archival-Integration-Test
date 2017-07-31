const express = require('express')
const feathers = require('feathers/lib/feathers')
const rest = require('feathers-rest')
const hooks = require('feathers-hooks')
const errorHandler = require('feathers-errors/handler')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const path = require('path')
const http = require('http')

const config = require('./config')
const services = require('./services')

const app = feathers(express())

app
  .set('config', config)
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(cors())
  .configure(rest())
  .configure(hooks())
  .configure(services())
  .use(errorHandler())

const server = new http.Server(app)

if (config.apiPort) {
  server.listen(config.apiPort, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅ is running, talking to API server on')
    console.info(`==> 💻  Open http://localhost:${config.apiPort} in a browser to view the app.`)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}