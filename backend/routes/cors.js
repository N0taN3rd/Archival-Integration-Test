const router = require('express').Router()

module.exports = function (config) {
  router.get('/', (req, res) => {
    res.cookie('acidApiAuth', 'acid:tabs', {
      httpOnly: false,
      secure: false
    })
    res.render('cors/test1', {acidApiLoc: config.apiEndPoint})
  })
  router.get('/index.html', (req, res) => {
    res.cookie('acidApiAuth', 'acid:tabs', {
      httpOnly: false,
      secure: false
    })
    res.render('cors/test1', {acidApiLoc: config.apiEndPoint})
  })
  return router
}
