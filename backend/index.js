const express = require('express')
const cookieParser = require('cookie-parser')
const sitemap = require('express-sitemap')

const logger = require('./logers/front')
const config = require('./config')
const routes = require('./routes')
const siteMapConfig = require('./sitemapConfig')

const app = express()

console.log(config.apiEndPoint)

const theSiteMapConfig = siteMapConfig(config)
const theSiteMap = sitemap(theSiteMapConfig)

app
  .enable('trust proxy')
  .engine(config.viewEngine, require(config.viewEngine).__express)
  .set('config', config)
  .set('view engine', config.viewEngine)
  .set('views', config.viewsPath)
  .use(cookieParser())
  .use(logger(theSiteMapConfig))
  .get('*.js', (req, res, next) => {
    if (req.url.includes('-bundle') || req.url.includes('mainifest')) {
      req.url = req.url + '.gz'
      res.set('Content-Encoding', 'gzip')
    }
    next()
  })
  .get('/sitemap.xml', (req, res, next) => {
    theSiteMap.XMLtoWeb(res)
  })
  .get('/robots.txt', (req, res, next) => {
    theSiteMap.TXTtoWeb(res)
  })
  .use('/', routes.acidFront(config))
  .use('/acidv1', routes.acidV1(config))
  .use('/cors', routes.corsTest(config))
  .use('/dynamic', routes.dynamicTest(config))
  .use('/redirection', routes.redirectionTest(config))
  .use('/tests', routes.tests(config))
  .use('/funkyTown', routes.funkyTown(config))
  .get('/list*', (req, res, next) => {
    res.redirect('/tests/polymer')
  })
  .use(express.static(config.staticPath))

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
