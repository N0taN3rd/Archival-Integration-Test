import { createAction } from 'redux-actions'
import axios from 'axios'

const EARL_SEP = '/'
const hs = `https:${EARL_SEP}${EARL_SEP}`
const h = `http:${EARL_SEP}${EARL_SEP}`

export const fetchWikiLE = createAction('FETCH_WIKI_LE',
  () => axios.get(process.env.WIKI_ENDPOINT)
    .then(response => ({
      done: true,
      resUrl: response.config.url,
      reqUrl: response.request.responseURL,
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
      wasError: false,
      data: response.data
    }))
    .catch(error => {
      let whatHappened = {
        done: true,
        wasError: true,
        hadRes: false
      }
      if (error.response) {
        whatHappened.resUrl = error.response.config.url
        whatHappened.reqUrl = error.response.request.responseURL
        whatHappened.headers = error.response.headers
        whatHappened.data = error.response.data
        whatHappened.status = error.response.status
        whatHappened.statusText = error.response.statusText
        whatHappened.hadRes = true
      } else if (error.request) {
        whatHappened.display = 'No Response'
      } else {
        whatHappened.display = `Error ${error}`
      }
      return whatHappened
    })
)

export const fetchLMGTFY = createAction('FETCH_LMGTFY',
  () => axios.get(process.env.LMGTFY_ENDPOINT)
    .then(response => ({
      resUrl: response.config.url,
      reqUrl: response.request.responseURL,
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
      wasError: false,
      done: true,
      data: response.data
    }))
    .catch(error => {
      let whatHappened = {
        wasError: true,
        hadRes: false,
        done: true
      }
      if (error.response) {
        whatHappened.resUrl = error.response.config.url
        whatHappened.reqUrl = error.response.request.responseURL
        whatHappened.headers = error.response.headers
        whatHappened.data = error.response.data
        whatHappened.status = error.response.status
        whatHappened.statusText = error.response.statusText
        whatHappened.hadRes = true
      } else if (error.request) {
        whatHappened.display = 'No Response'
      } else {
        whatHappened.display = `Error ${error}`
      }
      return whatHappened
    })
)

export const fetchChuckJoke = createAction('FETCH_CHUCK',
  (cat) => {
    let chuck = window.__JOKES__.chuckNorris
    let reqConf = {
      method: 'GET',
      baseURL: `${chuck.https ? hs : h}${chuck.endpoint}`,
      url: `${EARL_SEP}jokes${EARL_SEP}${chuck.randy}?category=${cat}`
    }
    return axios(reqConf)
      .then(response => ({
        resUrl: response.config.url,
        reqUrl: response.request.responseURL,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        wasError: false,
        done: true,
        data: response.data
      }))
      .catch(error => {
        let whatHappened = {
          wasError: true,
          hadRes: false,
          done: true
        }
        if (error.response) {
          whatHappened.resUrl = error.response.config.url
          whatHappened.reqUrl = error.response.request.responseURL
          whatHappened.headers = error.response.headers
          whatHappened.data = error.response.data
          whatHappened.status = error.response.status
          whatHappened.statusText = error.response.statusText
          whatHappened.hadRes = true
        } else if (error.request) {
          whatHappened.display = 'No Response'
        } else {
          whatHappened.display = `Error ${error}`
        }
        return whatHappened
      })
  }
)
