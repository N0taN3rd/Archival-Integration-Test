const router = require('express').Router()
const testsRouter = require('./tests')

module.exports = function (express, config) {
  router.get('/acidAssets/*.js', (req, res, next) => {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    next()
  })

  router.use('/acidAssets', express.static(config.acidAssets))

  router.get('/', (req, res) => {
    res.render('aatv2', {embed: JSON.stringify(config.acidRoutes)})
  })

  router.get('/index.html', (req, res) => {
    res.render('aatv2', {embed: JSON.stringify(config.acidRoutes)})
  })

  router.get('/acidv1', (req, res) => {
    res.render('aatv2', {embed: JSON.stringify(config.acidRoutes)})
  })

  router.get('/dynamic', (req, res) => {
    res.render('aatv2', {embed: JSON.stringify(config.acidRoutes)})
  })

  router.get('/redirection', (req, res) => {
    res.render('aatv2', {embed: JSON.stringify(config.acidRoutes)})
  })

  router.get('/tests', testsRouter(express, res))
  return router
}
