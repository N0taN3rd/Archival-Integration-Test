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

const config = require('./config')
const redirectionRouter = require('./routes/redirection')

const app = feathers(express())

const corsTestApiLoc = {acidApiLoc: config.apiEndPoint}
const dynamicIFramesApiLoc = {
  apiLoremPixel: `${config.apiEndPoint}/lorempixel`,
  apiLoremPixelEncoded: Buffer.from(`${config.apiEndPoint}/lorempixel`, 'utf8').toString('base64')
}
const dynamicReactApiLoc = {
  apiLoc: config.apiEndPoint
}

console.log(config.apiEndPoint)

app
  .engine(config.viewEngine, require(config.viewEngine).__express)
  .set('config', config)
  .set('view engine', config.viewEngine)
  .set('views', config.viewsPath)
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .get('*.js', (req, res, next) => {
    if (req.url.includes('bundle')) {
      req.url = req.url + '.gz'
      res.set('Content-Encoding', 'gzip')
    }
    next()
  })
  .use(express.static(config.staticPath))
  .use('/redirection', redirectionRouter)
  .get('/', (req, res) => {
    res.render('aatv2')
  })
  .get('/highlyDynamic', (req, res) => {
    res.render('aatv2')
  })
  .get('/cors', (req, res, next) => {
    res.cookie('acidApiAuth', 'acid:tabs', config.corsAuthCookie)
    res.render('cors/test1', corsTestApiLoc)
  })
  .get('/highlyDynamic/iframeMadness', (req, res, next) => {
    res.render('dynamic/iframes', dynamicIFramesApiLoc)
  })
  .get('/highlyDynamic/react', (req, res, next) => {
    res.render('dynamic/react', dynamicReactApiLoc)
  })
  .use(errorHandler())

if (config.port) {
  app.listen(config.port, config.host, err => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> ✅ is running, talking to frontend server on')
    console.info(`==> 💻  Open http://${config.host}:${config.port} in a browser to view the app.`)
  })
} else {
  console.error('==>     ERROR: No LISTENPORT environment variable has been specified')
}
