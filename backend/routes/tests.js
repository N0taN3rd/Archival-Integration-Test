const router = require('express').Router()
const jsStringify = require('js-stringify')

module.exports = function (config) {
  router.get('/iframeMadness', (req, res, next) => {
    res.render('dynamic/iframes', {
      apiLoremPixel: `${config.apiEndPoint}/lorempixel`,
      apiLoremPixelEncoded: Buffer.from(`${config.apiEndPoint}/lorempixel`, 'utf8').toString('base64'),
      hehehEncoded: Buffer.from(config.hehehEncoded, 'utf8').toString('base64'),
      adConf: {url: `${config.apiEndPoint}/ifmAds`}
    })
  })

  router.get('/simpleReact', (req, res, next) => {
    res.render('dynamic/react', {
      apiLoc: config.apiEndPoint,
      expectedDomain: config.frontEndDomain
    })
  })

  router.get('/reactSPA*', (req, res, next) => {
    res.render('dynamic/spa', {preservedDate: Date.now(), jokes: jsStringify(config.randomJokes)})
  })

  router.get('/onlyCSS', (req, res, next) => {
    res.set('Link', '<linkIncluded.css>;rel=stylesheet')
    res.set('Content-Type', 'text/html; charset=UTF-8')
    res.end()
  })

  router.get('/archivingUnfriendly', (req, res, next) => {
    res.render('funkyTown/archiveUnfriendly', config.getsWorse)
  })

  return router
}
