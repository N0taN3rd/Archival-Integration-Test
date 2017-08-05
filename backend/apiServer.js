const express = require('express')
const feathers = require('feathers/lib/feathers')
const rest = require('feathers-rest')
const hooks = require('feathers-hooks')
const errorHandler = require('feathers-errors/handler')
const local = require('feathers-authentication-local')
const jwt = require('feathers-authentication-jwt')
const auth = require('feathers-authentication')
const memory = require('feathers-memory')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const http = require('http')
const request = require('request')

const config = require('./config')
const services = require('./services')

const corsOptions = {
  allowedHeaders: ['X-Acid-Request', 'X-Requested-With', 'Content-Type', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Methods', 'Content-Length', 'Connection', 'Pragma', 'X-Powered-By', 'Vary'],
  methods: ['GET,HEAD,PUT,PATCH,POST,DELETE', 'OPTIONS'],
  origin: true,
  credentials: true
}
/*
 case 'lorempixel':
        return rp('http://lorempixel.com/400/200/')
 */
const app = feathers(express())

const HOST = process.env.USE_HOST || '0.0.0.0'

app.configure(rest((req, res) => {
  res.format({
    'application/acid.cors-ims-lookup.1': () => {
      res.end(JSON.stringify(res.data))
    },
    'application/acid.cors-ims-lookup.2': () => {
      res.end(JSON.stringify(res.data))
    },
    json () {
      res.json(res.data)
    }
  })
}))
  .configure(hooks())
  .set('config', config)
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(cors(corsOptions))
  .configure(auth(config.auth))
  .configure(local({
    name: 'acid-local',
    entity: 'user'
  }))
  .configure(jwt())
  .use('/users', memory())
  .configure(services())
  .post('/login', auth.express.authenticate('acid-local', {
    failureRedirect: '/login'
  }))
  .get('/login', (req, res, next) => {
    res.json({success: false})
  })
  .get('/lorempixel', (req, res, next) => {
    // res.status(404)
    // res.send('<p>boo</p>')
    request.get('http://lorempixel.com/400/200/').pipe(res)
  })
  .get('/httpTest', (req, res, next) => {
    res.send('<p>You Get Me!</p>')
  })
  .post('/httpTest', (req, res, next) => {
    res.json(JSON.stringify({movie: 'The Postman Always Rings Twice'}))
  })
  .put('/httpTest', (req, res, next) => {
    res.json(JSON.stringify({no: 'Do Not Put It There!'}))
  })
  .delete('/httpTest', (req, res, next) => {
    res.json(JSON.stringify({'Rick Deckard': 'Replicants are like any other machine, are either a benefit or a hazard. If they\'re a benefit it\'s not my problem.'}))
  })
  .use(errorHandler({
    html (error, req, res, next) {
      console.log(error)
      // render your error view with the error object
      res.render('error', error)
    },
    json (error, req, res, next) {
      console.log(error)
      // render your error view with the error object
      res.send(error)
    }
  }))

if (config.port) {
  app.listen(config.port, config.host, err => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> ✅ is running, talking to API server on')
    console.info(`==> 💻  Open http://${config.host}:${config.port} in a browser to view the app.`)
  })
} else {
  console.error('==>     ERROR: No LISTENPORT environment variable has been specified')
}
