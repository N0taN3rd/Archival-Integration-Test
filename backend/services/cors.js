const rp = require('request-promise')
const Promise = require('bluebird')
const fs = require('fs-extra')

const apiKey = '3e75fa0fe8a8ea56a70bfb66a53e9220'

const flickr = {
  uri: `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&user_id=32951986%40N05&extras=url_q&format=json&nojsoncallback=1&api_key=${apiKey}`,
  method: 'GET',
  json: true
}

// const ims = fs.readJsonSync('ims.json')

class CORService {
  get (id, params) {
    // console.log('cors get', id, params)
    switch (id) {
      case 'randyIm':
        return this._ims.find({query: params.query})
      default:
        return this._ims.get({query: {$limit: 1}})
    }
    // return rp(flickr).then((res) => res)

  }

  find (id, params) {
    console.log(id, params)
    return Promise.resolve({
      it: 'hi'
    })
  }

  setup (app, path) {
    this.app = app
    this._ims = this.app.service('images')
    return Promise.resolve()
  }
}

const acceptTypes = 'application/acid.cors-ims-lookup.1+json'
const acidRequestTypes = new Set(['acid-cors-photo-api-1'])
const acidReqestWith = new Set(['acid-axios'])

function badAcceptType (accept) {
  if (Array.isArray(acceptTypes)) {
    let i = 0
    let len = acceptTypes.length
    for (; i < len; ++i) {
      if (!accept.includes(acceptTypes[i])) {
        return true
      }
    }
    return false
  }
  return !accept.includes(acceptTypes)
}

const hardCORS = '/serviceCors/randyIm'

module.exports = {
  CORService,
  checkHeaders (req, res, next) {
    let head = req.headers
    if (req.path === hardCORS) {
      if (head.accept && badAcceptType(head.accept)) {
        res.status(406).json({
          message: `We have none of ${head.accept}`,
          reason: 'Bad Accept header value. We only accept that you accept specific types ;)'
        })
        return
      } else if (!head.accept) {
        res.status(400).json({
          message: `What do you accept?`,
          reason: 'No Accept header'
        })
        return
      }
      if (head['x-acid-request'] && !acidRequestTypes.has(head['x-acid-request'])) {
        res.status(400).json({
          message: `We do not drop this kind of acid:  ${head['x-acid-request']}`,
          reason: 'Unknown x-acid-request header value'
        })
        return
      } else if (!head['x-acid-request']) {
        res.status(400).json({
          message: 'What kind of acid should we drop?',
          reason: 'No x-acid-request header'
        })
        return
      }
      if (head['x-requested-with'] && !acidReqestWith.has(head['x-requested-with'])) {
        res.status(400).json({
          message: `Your not a cop are you:  ${head['x-requested-with']}`,
          reason: 'Unknown x-requested-with header value'
        })
        return
      } else if (!head['x-requested-with']) {
        res.status(400).json({
          message: 'How do we know you are not the fuzz?',
          reason: 'No x-requested-with header value'
        })
        return
      }
    }
    next()
  }
}
