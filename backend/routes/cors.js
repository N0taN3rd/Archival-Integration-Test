const router = require('express').Router()

router.get('/cors/basic', (req, res, next) => {
  res.redirect('/redirection/chain/1')
})

module.exports = router
