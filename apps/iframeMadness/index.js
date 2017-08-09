import 'babel-polyfill'
import axios from 'axios'
import nurls from './notUrls'
import Purl from './purl'
import doCorsMe from './doCorsMe'
import cleanUpRandyHTML from './cleanUpRandyHTML'
import $ from 'jquery'

const helpers = {
  purl: new Purl()
}

const getMeThis = {
  type: 'fetch',
  id: 'nums',
  what: nurls.randyNumbers.join('')
}

let didIms = false
let footerAlive = false
let evalInjected = false
let checkInterval

function doIms () {
  didIms = true
  doCorsMe('coresMeURL', 'coresMeImDiv', helpers.purl, true)
    .then(() => {})
    .catch(error => {
      console.error(error)
    })
  doCorsMe('coresMeUR2L', 'coresMeImDiv2', helpers.purl)
    .then(() => {})
    .catch(error => {
      console.error(error)
    })
}

function evalInject (e) {
  axios.get(atob(nurls.evalInjected))
    .then(ret => {
      evalInjected = true
      eval(ret.data)
      let headers = ''
      for (let [k, v] of Object.entries(ret.headers)) {
        headers += `${k}: ${v}<br/>`
      }
      e.source.postMessage({
        type: 'info',
        id: 'infoEvalInjected',
        header: `Eval Injected Iframe`,
        badge: `HTTP ${ret.status} ${ret.statusText}`,
        p1: `Request URL: ${ret.config.url}<br/>Response URL: ${ret.request.responseURL}`,
        p2: `HTTP Headers ${headers}`
      }, e.origin)
      // doIms()
    })
    .catch(error => {
      if (error.response) {
        let headers = ''
        for (let [k, v] of Object.entries(error.response.headers)) {
          headers += `${k}: ${v}<br/>`
        }
        e.source.postMessage({
          type: 'info',
          id: 'infoEvalInjected',
          header: `Eval Injected Iframe`,
          badgeC: 'uk-label-error',
          badge: `HTTP ${error.response.status} ${error.response.statusText}`,
          p1: `Request URL: ${error.config.url}<br/>Response URL: ${error.response.responseURL}`,
          p2: `HTTP Headers ${headers}`
        }, e.origin)
      } else if (error.request) {
        e.source.postMessage({
          type: 'info',
          id: 'infoEvalInjected',
          header: `Eval Injected Iframe`,
          badgeC: 'uk-label-error',
          badge: `HTTP ${error.response.status} ${error.response.statusText}`,
          p1: `Request URL: ${error.config.url}`
        }, e.origin)
      } else {
        e.source.postMessage({
          type: 'info',
          id: 'infoEvalInjected',
          header: `Eval Injected Iframe`,
          badgeC: 'uk-label-error',
          badge: `ERROR`,
          p1: `${error}: ${error.message}`
        }, e.origin)
      }
    })
}

function getAdds (e) {
  axios.get(JSON.parse($('#adContainer').attr('data-adConf')).url)
    .then(result => {
      let headers = ''
      for (let [k, v] of Object.entries(result.headers)) {
        headers += `${k}: ${v}<br/>`
      }
      // console.log(result)
      e.source.postMessage({
        type: 'info',
        id: 'infoAds',
        header: `Ads`,
        badge: `HTTP ${result.status} ${result.statusText}`,
        p1: `Request URL: ${result.config.url}<br/>Response URL: ${result.request.responseURL}`,
        p2: `HTTP Headers:<br/>${headers}`
      }, e.origin)
      $('#adContainer').append($(`<iframe src="${result.data.location}"></iframe>`))
    }).catch(error => {
      if (error.response) {
        let headers = ''
        for (let [k, v] of Object.entries(error.response.headers)) {
          headers += `${k}: ${v}<br/>`
        }
        e.source.postMessage({
          type: 'info',
          id: 'infoAds',
          header: `Ads`,
          badgeC: 'uk-label-error',
          badge: `HTTP ${error.response.status} ${error.response.statusText}`,
          p1: `Request URL: ${error.config.url}<br/>Response URL: ${error.response.responseURL}`,
          p2: `HTTP Headers:<br/>${headers}`
        }, e.origin)
      } else if (error.request) {
        e.source.postMessage({
          type: 'info',
          id: 'infoAds',
          header: `Ads`,
          badgeC: 'uk-label-error',
          badge: `HTTP ${error.response.status} ${error.response.statusText}`,
          p1: `Request URL: ${error.config.url}`
        }, e.origin)
      } else {
        e.source.postMessage({
          type: 'info',
          id: 'infoAds',
          header: `Ads`,
          badgeC: 'uk-label-error',
          badge: `ERROR`,
          p1: `${error}: ${error.message}`
        }, e.origin)
      }
      console.error(error)
    })
}

function messageHandler (e) {
  if (e.data) {
    switch (e.data.type) {
      case 'goHome':
        window.location = '/'
        break
      case 'goDynam':
        window.location = '/dynamic'
        break
      case 'alive-footer':
        footerAlive = true
        getAdds(e)
        evalInject(e)
        doIms()
        break
      case 'alvie':
        e.source.postMessage(getMeThis, e.origin)
        helpers.purl.hostInfo(e.data.location, 'hostNotif')
        break
      case 'fetched':
        if (e.data.id === 'nums') {
          // infoGotRandy
          try {
            document.getElementById('footerIF').contentWindow.postMessage({
              type: 'info',
              id: 'infoGotRandy',
              header: `Random Numbers`,
              badge: `HTTP ${e.data.status} ${e.data.statusText}`,
              p1: `Request URL: ${e.data.resUrl}<br/>Response URL: ${e.data.resUrl}`,
              p2: `HTTP Headers:<br/>${e.data.headers}`
            }, '*')
          } catch (error) {
            console.error(error)
          }
          let num = document.getElementById('randyNums')
          num.innerHTML = cleanUpRandyHTML(e.data.data, nurls.randyNumsAppend)
        }
        break
      case 'fetched-error':
        if (e.data.id === 'nums') {
          if (e.data.hadRes) {
            try {
              document.getElementById('footerIF').contentWindow.postMessage({
                type: 'info',
                id: 'infoGotRandy',
                header: `Random Numbers`,
                badgeC: 'uk-label-error',
                badge: `HTTP ${e.data.status} ${e.data.statusText}`,
                p1: `Request URL: ${e.data.resUrl}<br/>Response URL: ${e.data.resUrl}`,
                p2: `HTTP Headers:<br/>${e.data.headers}`
              }, '*')
            } catch (error) {
              console.error(error)
            }
          } else if (e.data.hadReq) {
            try {
              document.getElementById('footerIF').contentWindow.postMessage({
                type: 'info',
                id: 'infoGotRandy',
                header: `Random Numbers`,
                badgeC: 'uk-label-error',
                badge: `Error`,
                p1: `Request URL: ${e.data.resUrl}`,
                p2: `${e.data.eMessage}`
              }, '*')
            } catch (error) {
              console.error(error)
            }
          } else {
            try {
              document.getElementById('footerIF').contentWindow.postMessage({
                type: 'info',
                id: 'infoGotRandy',
                header: `Random Numbers`,
                badgeC: 'uk-label-error',
                badge: `Severe Error`,
                p1: `${e.data.eMessage}`
              }, '*')
            } catch (error) {
              console.error(error)
            }
          }
        }
        break
      default:
        break
    }
  }
}

$(document).ready(() => {
  checkInterval = setInterval(() => {
    let checkString = ''
    if (!footerAlive) {
      checkString += 'FOOTER IFRAME NOT ALIVE FAIL!<br/>'
    }
    if (!evalInjected) {
      checkString += 'EVAL IFRAME NOT INJECTED FAIL!<br/>'
    }
    if (!didIms) {
      checkString += 'IMAGES NOT GOTTEN FAIL!<br/>'
      doIms()
    }
    if (checkString !== '') {
      let p = document.createElement('p')
      p.innerHTML = `${checkString}${new Date(Date.now())}<br/>`
      document.getElementById('hostNotif').append(p)
    }
  }, 10000)
  window.addEventListener('message', messageHandler, false)
  $('#footerContainer').append($('<iframe id="footerIF" class="footer" src="/tests/iframeMadness/footer.html"></iframe>'))
  // iframe.footerFrame(src='/tests/iframeMadness/footer.html')
})
