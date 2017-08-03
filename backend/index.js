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

const corsAuthCookie = {
  httpOnly: false,
  path: '/cors'
}

const corsTestApiLoc = {acidApiLoc: process.env.API_ENDPOINT}
const dynamicIFramesApiLoc = {
  apiLoremPixel: `${process.env.API_ENDPOINT}/lorempixel`,
  apiLoremPixelEncoded: Buffer.from(`${process.env.API_ENDPOINT}/lorempixel`, 'utf8').toString('base64')
}
const dynamicReactApiLoc = {
  apiLoc: process.env.API_ENDPOINT
}

console.log(process.env.API_ENDPOINT)

const HOST = process.env.USE_HOST || '0.0.0.0'


app
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
  .get('/cors', (req, res, next) => {
    res.cookie('acidApiAuth', 'acid:tabs', corsAuthCookie)
    res.render('cors/test1', corsTestApiLoc)
  })
  .get('/highlyDynamic/iframeMadness', (req, res, next) => {
    res.render('dynamic/iframes', dynamicIFramesApiLoc)
  })
  .get('/highlyDynamic/react', (req, res, next) => {
    res.render('dynamic/react', dynamicReactApiLoc)
  })
  .use(errorHandler())

if (process.env.LISTENPORT) {
  app.listen(process.env.LISTENPORT, HOST, err => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> ✅ is running, talking to frontend server on')
    console.info(`==> 💻  Open http://${HOST}:${process.env.LISTENPORT} in a browser to view the app.`)
  })
} else {
  console.error('==>     ERROR: No LISTENPORT environment variable has been specified')
}
