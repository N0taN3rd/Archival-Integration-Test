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

const config = require('./config')
const services = require('./services')

const corsOptions = {
  allowedHeaders: ['X-Acid-Request', 'X-Requested-With', 'Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Connection', 'Pragma', 'X-Powered-By', 'Vary'],
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: true,
  credentials: true
}

const app = feathers(express())

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
  .configure(auth({
    secret: 'ImACopYouIdiot',
    cookie: {
      enabled: true,
      name: 'acid-auth'
    }
  }))
  .configure(local({
    name: 'acid-local',
    entity: 'user'
  }))
  .configure(jwt())
  .use('/users', memory())
  // .use((req, res, next) => {
  //   req.feathers.fromMiddleware = {
  //     xhr: req.xhr,
  //     head: req.headers
  //   }
  //   next()
  // })
  .configure(services())
  .post('/login', auth.express.authenticate('acid-local', {
    failureRedirect: '/login'
  }))
  .get('/login', (req, res, next) => {
    res.json({success: false});
  })
  .use(errorHandler({
    html (error, req, res, next) {
      console.log(error)
      // render your error view with the error object
      res.render('error', error);
    },
    json (error, req, res, next) {
      console.log(error)
      // render your error view with the error object
      res.send(error);
    }
  }))

const authOpts = Object.assign({}, app.get('authentication'), {jwt: {expiresIn: '1m'}})

if (config.apiPort) {
  app.listen(config.apiPort, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅ is running, talking to API server on')
    console.info(`==> 💻  Open http://localhost:${config.apiPort} in a browser to view the app.`)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}