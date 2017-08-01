const router = require('express').Router()
const useragent = require('express-useragent')
const randy = require('../util/randy')


const counterCookie = {
  httpOnly: true
}
const finCookie = {
  httpOnly: false
}

router.get('/chain', (req, res) => {
  res.redirect('/redirection/chain/1')
})

router.get('/chain/:n(\\d+)', (req, res) => {
  if (req.params.n <= 4) {
    res.redirect(`/redirection/chain/${req.params.n + 1}`)
  } else {
    res.redirect(`/redirection/chain/fin`)
  }
})

router.get('/chain/fin', (req, res) => {
  res.render('redirected/chain', {
    title: `Final Redirection`,
    message: `Made It Past 4 Redirections`,
    ua: req.headers['user-agent']
  })
})

router.get('/cookie', function (req, res) {
  let times = randy(1, 4)
  res.cookie('redirectMe', `1|${times}|false`, counterCookie)
  res.redirect('/redirection/cookie/1')
})

router.get('/cookie/\\d+', (req, res) => {
  if (req.cookies.redirectMe) {
    let [cur, times, done] = req.cookies.redirectMe.split('|')
    if (done === 'false') {
      cur = parseInt(cur) + 1
      times = parseInt(times)
      if (cur <= times) {
        res.cookie('redirectMe', `${cur}|${times}|false`, counterCookie)
        res.redirect(`/redirection/cookie/${cur}`)
      } else {
        res.cookie('redirectMe', `${cur}|${times}|true`, counterCookie)
        res.redirect(`/redirection/cookie/fin`)
      }
    } else {
      res.redirect('/redirection')
    }
  } else {
    res.redirect('/redirection')
  }
})

router.get('/cookie/fin', (req, res) => {
  let rmc = req.cookies.redirectMe
  res.cookie('redirectFin', rmc, finCookie)
  res.clearCookie('redirectMe')
  res.render('redirected/cookie', {
    title: `Final Redirection`,
    message: `The cookie accessible via 'document.cookie' you should have is ${rmc}`,
    ua: req.headers['user-agent']
  })
})

module.exports = router
