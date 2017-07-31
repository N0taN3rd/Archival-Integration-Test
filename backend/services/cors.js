const rp = require('request-promise')
const Promise = require('bluebird')

const apiKey = '3e75fa0fe8a8ea56a70bfb66a53e9220'

const flickr = {
  uri: `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&user_id=32951986%40N05&extras=url_q&format=json&nojsoncallback=1&api_key=${apiKey}`,
  method: 'GET',
  json: true
}

class CORService {
  get (id, params) {
    console.log('cors get', id, params)
    return rp(flickr).then((res) => res)
  }

  find (id, params) {
    console.log(id, params)
    return Promise.resolve({
      it: 'hi'
    })
  }

  setup (app, path) {
    this._app = app
    this.dbService = this._app.service('apikeys')
  }
}

module.exports = {
  CORService,
  updateContentType (req, res, next) {
    console.log(req,res)
    next()
  }
}
