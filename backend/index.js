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
const redirectionRouter = require('./routes/redirection')
const cookies = require('./constants/cookies')
const corsRouter = require('./routes/cors')

const app = feathers(express())

app
  .set('config', config)
  .set('view engine', config.viewEngine)
  .set('views', config.viewsPath)
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(express.static(config.staticPath))
  .use('/redirection', redirectionRouter)
  .get('/cors', (req, res, next) => {
    res.cookie('acidApiAuth', 'acid:tabs', cookies.httpDom)
    res.render('cors/test1', {scriptLoc: 'http://localhost:9000/cors.js'})
  })
  .use(errorHandler())

// const server = new http.Server(app)

if (config.port) {
  app.listen(config.port, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅ is running, talking to frontend server on')
    console.info(`==> 💻  Open http://localhost:${config.port} in a browser to view the app.`)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
