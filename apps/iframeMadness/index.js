import 'babel-polyfill'
import axios from 'axios'
import nurls from './notUrls'
import Purl from './purl'
import doCorsMe from './doCorsMe'
import cleanUpRandyHTML from './cleanUpRandyHTML'
import $ from 'jquery'

const helpers = {
  purl: null
}
const getMeThis = {
  type: 'fetch',
  id: 'nums',
  what: nurls.randyNumbers.join('')
}

function doIms () {
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

function messageHandler (e) {
  if (e.data) {
    switch (e.data.type) {
      case 'alvie':
        e.source.postMessage(getMeThis, e.origin)
        helpers.purl = new Purl(e.data.location, 'hostNotif')
        break
      case 'fetched':
        if (e.data.id === 'nums') {
          $('#_infoGotRandy')
            .append(`<h2>Injected Iframe Get Random Numbers Page. HTTP ${e.data.status} ${e.data.statusText}</h2>`)
            .append(`<p>Request URL: ${e.data.resUrl}<br/>Response URL: ${e.data.resUrl}</p>`)
            .append(`<p>HTTP Headers:<br/>${e.data.headers}</p>`)
          let num = document.getElementById('randyNums')
          num.innerHTML = cleanUpRandyHTML(e.data.data, nurls.randyNumsAppend)
          doIms()
        }
        break
      case 'fetched-error':
        if (e.data.id === 'nums') {
          if (e.data.hadRes) {
            $('#_infoGotRandy')
              .append(`<h2>Injected Iframe Get Random Numbers Page. HTTP ${e.data.status} ${e.data.statusText}</h2>`)
              .append(`<p>Request URL: ${e.data.resUrl}<br/>Response URL: ${e.data.resUrl}</p>`)
              .append(`<p>HTTP Headers:<br/>${e.data.headers}</p>`)
          } else if (e.data.hadReq) {
            $('#_infoGotRandy')
              .append(`<h2>Injected Iframe Get Random Numbers Page. Error</h2>`)
              .append(`<p>Request URL: ${e.data.resUrl}</p>`)
              .append(`<p>${e.data.eMessage}</p>`)
          } else {
            $('#_infoGotRandy')
              .append(`<h2>Injected Iframe Get Random Numbers Page. Error</h2>`)
              .append(`<p>${e.data.eMessage}</p>`)
          }
          doIms()
        }
        break
      default:
        break
    }
  }
}

window.addEventListener('message', messageHandler, false)
axios.get(atob(nurls.evalInjected))
  .then(ret => {
    eval(ret.data)
    let headers = ''
    for (let [k, v] of Object.entries(ret.headers)) {
      headers += `${k}: ${v}<br/>`
    }
    $('#_infoEvalInjected')
      .append(`<h2>Eval Injected Iframe. HTTP ${ret.status} ${ret.statusText}</h2>`)
      .append(`<p>Request URL: ${ret.config.url}<br/>Response URL: ${ret.request.responseURL}</p>`)
      .append(`<p>HTTP Headers<br/>${headers}</p>`)
  })
  .catch(error => {
    if (error.response) {
      let headers = ''
      for (let [k, v] of Object.entries(error.response.headers)) {
        headers += `${k}: ${v}<br/>`
      }
      $('#_infoEvalInjected')
        .append(`<h2>Eval Injected Iframe. HTTP ${error.response.status} ${error.response.statusText}</h2>`)
        .append(`<p>Request URL: ${error.config.url}<br/>Response URL: ${error.response.responseURL}</p>`)
        .append(`<p>HTTP Headers:<br/>${headers}</p>`)
    } else if (error.request) {
      $('#_infoEvalInjected')
        .append(`<h2>Eval Injected Iframe. ${error}</h2>`)
        .append(`<p>Request URL: ${error.config.url}</p>`)
    } else {
      $('#_infoEvalInjected')
        .append(`<h2>Eval Injected Iframe. Error</h2>`)
        .append(`<p>${error}: ${error.message}</p>`)
    }
    $('#_infoGotRandy')
      .append(`<h2>Injected Iframe Get Random Numbers Page. Error</h2>`)
      .append(`<p>Unable to inject iframe :'(</p>`)
    doIms()
  })
