const router = require('express').Router()
const theCookie = {
  httpOnly: false,
  path: '/cors',
  secure: false
}

router.get('/', (req, res, next) => {
  res.cookie('acidApiAuth', 'acid:tabs', theCookie)
  res.render('cors/test1')
})

// router.get('/apiReq', (req, res, next) => {
//   // res.cookie('acidApiAuth', 'acid:tabs', cookies.httpDom)
//   res.render('cors/test2', {scriptLoc: 'http://localhost:9000/cors.js'})
// })

module.exports = router
