const path = require('path')
const ONE_DAY = 60 * 60 * 24 * 1000

module.exports = {
  auth: {
    secret: 'ImACopYouIdiot',
    cookie: {
      enabled: true,
      httpOnly: false,
      maxAge: ONE_DAY,
      name: 'feathers-jwt',
      secure: false,
    }
  },
  corsAuthCookie: {
    path: '/cors',
    httpOnly: false,
    maxAge: ONE_DAY
  },
  host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  port: process.env.LISTENPORT,
  apiEndPoint: process.env.API_ENDPOINT || '',
  frontEndDomain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'wsdl-docker.cs.odu.edu',
  hehehEncoded: process.env.NODE_ENV !== 'production' ? 'http://localhost:8090/tests/iframeMadness/evalInjectedIframe2.html' : 'http://wsdl-docker.cs.odu.edu:8080/tests/iframeMadness/evalInjectedIframe2.html',
  dbPath: path.join(__dirname, '..', 'dbs'),
  staticPath: path.join(__dirname, '..', 'public'),
  viewsPath: path.join(__dirname, '..', 'pug'),
  viewEngine: 'pug',
  randomJokes: {
    chuckNorris: {
      cats: ['dev', 'movie', 'food', 'celebrity', 'science', 'political', 'sport', 'religion', 'explicit', 'animal', 'music', 'history', 'travel', 'career', 'money', 'fashion'],
      randy: 'random',
      https: true,
      endpoint: 'api.chucknorris.io'
    },
    dad: {
      accept: 'json',
      endpoint: 'icanhazdadjoke.com',
      image: {
        path: 'j',
        type: '.png'
      },
      https: true
    }
  },
  tvMaze: {
    starTrek: {
      original: 'http://api.tvmaze.com/singlesearch/shows/490',
      tng: 'http://api.tvmaze.com/singlesearch/shows/491'
    },
    xFiles: 'http://api.tvmaze.com/singlesearch/shows/430'
  },
  acidRoutes: require('./routeInfo/acid')
}
