const express = require('express')
const feathers = require('feathers/lib/feathers')
const rest = require('feathers-rest')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const path = require('path')
const http = require('http')

const config = require('./config')
const redirectionRouter = require('./routes/redirection')

const app = feathers(express())

app.set('config', config)
  .set('views', path.join(__dirname, '..', 'pug'))
  .set('view engine', 'pug')

app.configure(rest())

app.use(express.static(path.join(__dirname, '..', 'public')))
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))

app.use('/redirection', redirectionRouter)


const server = new http.Server(app)

if (config.port) {
  server.listen(config.port, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅ is running, talking to API server on');
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.');
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
