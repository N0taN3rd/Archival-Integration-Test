const router = require('express').Router()

router.get('/cors', (req, res) => {
  res.redirect('/redirection/chain/1')
})


module.exports = router
