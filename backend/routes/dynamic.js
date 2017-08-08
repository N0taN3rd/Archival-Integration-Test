const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('<p>You Get Me!</p>')
})

router.head('/', (req, res, next) => {
  res.send('<p>You Get Me!</p>')
})

router.post('/', (req, res, next) => {

})

router.put('/', (req, res, next) => {

})

router.delete('/', (req, res, next) => {

})

module.exports = router
