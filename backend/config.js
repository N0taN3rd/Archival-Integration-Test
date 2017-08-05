const path = require('path')
const ONE_DAY = 60 * 60 * 24 * 1000

module.exports = {
  auth: {
    secret: 'ImACopYouIdiot',
    cookie: {
      enabled: true,
      httpOnly: false,
      maxAge: ONE_DAY,
      secure: false
    }
  },
  corsAuthCookie: {
    path: '/cors',
    httpOnly: false,
    maxAge: ONE_DAY,
    secure: false
  },
  host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  port: process.env.LISTENPORT,
  apiEndPoint: process.env.API_ENDPOINT || '',
  frontEndDomain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'wsdl-docker.cs.odu.edu',
  dbPath: path.join(__dirname, '..', 'dbs'),
  staticPath: path.join(__dirname, '..', 'public'),
  viewsPath: path.join(__dirname, '..', 'pug'),
  viewEngine: 'pug',
  randomQuotes: {
    chuckNorisQuotes: 'https://api.chucknorris.io/jokes/random?category=dev',
    ronSwanson: 'http://ron-swanson-quotes.herokuapp.com/v2/quotes',
    dadJokes: 'https://icanhazdadjoke.com/'
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
