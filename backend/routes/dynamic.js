const router = require('express').Router()

module.exports = function (config) {
  router.get('/', (req, res) => {
    res.render('aatv2', {embed: JSON.stringify(config.acidRoutes)})
  })

  router.get('/index.html', (req, res) => {
    res.render('aatv2', {embed: JSON.stringify(config.acidRoutes)})
  })

  return router
}
