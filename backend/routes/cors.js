const router = require('express').Router()
const cookies = require('../constants/cookies')

router.get('/', (req, res, next) => {
  res.cookie('acidApiAuth', 'acid:tabs', cookies.httpDom)
  res.render('cors/test1', {scriptLoc: 'http://localhost:9000/cors.js'})
})

// router.get('/apiReq', (req, res, next) => {
//   // res.cookie('acidApiAuth', 'acid:tabs', cookies.httpDom)
//   res.render('cors/test2', {scriptLoc: 'http://localhost:9000/cors.js'})
// })

module.exports = router
