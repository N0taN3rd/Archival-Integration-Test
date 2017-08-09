import axios from 'axios'

function useFetch (it, whereID) {
  return fetch(it, {
    method: 'GET',
    headers: new Headers({'Origin': location.origin})
  }).then(ret => {
    let selector = whereID === 'coresMeImDiv' ? 'infoCors1' : 'infoCors2'
    let im = whereID === 'coresMeImDiv' ? '1' : '2'
    if (ret.ok) {
      let headers = ''
      for (let [k, v] of ret.headers.entries()) {
        headers += `${k}: ${v}<br/>`
      }
      try {
        document.getElementById('footerIF').contentWindow.postMessage({
          type: 'info',
          id: selector,
          header: `Random Image ${im}`,
          badge: `HTTP ${ret.status} ${ret.statusText}`,
          p1: `Request URL: ${it}<br/>Response URL: ${ret.url}`,
          p2: `HTTP Headers:<br/>${headers}`
        }, '*')
      } catch (error) {
        console.error(error)
      }
      return ret.blob()
    } else {
      let headers = ''
      for (let [k, v] of ret.headers.entries()) {
        headers += `${k}: ${v}<br/>`
      }
      try {
        document.getElementById('footerIF').contentWindow.postMessage({
          type: 'info',
          id: selector,
          header: `Random Image ${im}`,
          badge: `HTTP ${ret.status} ${ret.statusText}`,
          p1: `Request URL: ${it}<br/>Response URL: ${ret.url}`,
          p2: `HTTP Headers:<br/>${headers}`
        }, '*')
      } catch (error) {
        console.error(error)
      }
      return ret.text().then(text => ({notBlob: true, text}))
    }
  })
    .then(blob => {
      if (!blob.notBlob) {
        let imageContainer = document.getElementById(whereID)
        let image = document.createElement('img')
        image.src = URL.createObjectURL(blob)
        imageContainer.appendChild(image)
        let thanksElem = document.createElement('p')
        let lp = '<a href="http://lorempixel.com">http://lorempixel.com</a>'
        thanksElem.innerHTML = `Thanks ${lp} for being so awesome!`
        imageContainer.appendChild(thanksElem)
      } else {
        document.getElementById(whereID).innerHTML = blob.text
      }
    })
}

function useAxios (it, whereID) {
  let selector = whereID === 'coresMeImDiv' ? '#_infoCors1' : '#_infoCors2'
  let im = whereID === 'coresMeImDiv' ? '1' : '2'
  return axios.get(it, {responseType: 'blob'})
    .then(ret => {
      let headers = ''
      for (let [k, v] of Object.entries(ret.headers)) {
        headers += `${k}: ${v}<br/>`
      }
      try {
        document.getElementById('footerIF').contentWindow.postMessage({
          type: 'info',
          id: selector,
          header: `Random Image ${im}`,
          badge: `HTTP ${ret.status} ${ret.statusText}`,
          p1: `Request URL: ${ret.config.url}<br/>Response URL: ${ret.request.responseURL}`,
          p2: `HTTP Headers:<br/>${headers}`
        }, '*')
      } catch (error) {
        console.error(error)
      }
      let imageContainer = document.getElementById(whereID)
      let image = document.createElement('img')
      image.src = URL.createObjectURL(ret.data)
      imageContainer.appendChild(image)
      let thanksElem = document.createElement('p')
      let lp = '<a href="http://lorempixel.com">http://lorempixel.com</a>'
      thanksElem.innerHTML = `Thanks ${lp} for being so awesome!`
      imageContainer.appendChild(thanksElem)
    }).catch(error => {
      if (error.response) {
        let headers = ''
        for (let [k, v] of Object.entries(error.response.headers)) {
          headers += `${k}: ${v}<br/>`
        }
        try {
          document.getElementById('footerIF').contentWindow.postMessage({
            type: 'info',
            id: selector,
            header: `Random Image ${im}`,
            badgeC: 'uk-label-error',
            badge: `HTTP ${error.response.status} ${error.response.statusText}`,
            p1: `Request URL: ${error.config.url}<br/>Response URL: ${error.response.request.responseURL}`,
            p2: `HTTP Headers:<br/>${headers}`
          }, '*')
        } catch (error) {
          console.error(error)
        }
        document.getElementById(whereID).innerHTML = `<p>${error.response.data}, type: ${error.response.data.type}</p>`
      } else if (error.request) {
        try {
          document.getElementById('footerIF').contentWindow.postMessage({
            type: 'info',
            id: selector,
            header: `Random Image ${im}`,
            badgeC: 'uk-label-error',
            badge: `No Response`,
            p1: `Request URL: ${error.config.url}`,
            p2: `${error}`
          }, '*')
        } catch (error) {
          console.error(error)
        }
        document.getElementById(whereID).innerHTML = `<p>No Response</p>`
      } else {
        try {
          document.getElementById('footerIF').contentWindow.postMessage({
            type: 'info',
            id: selector,
            header: `Random Image ${im}`,
            badgeC: 'uk-label-error',
            badge: `Error`,
            p1: `${error}: ${error.message}`
          }, '*')
        } catch (error) {
          console.error(error)
        }
        document.getElementById(whereID).innerHTML = `<p>Really Bad Error</p>`
      }
    })
}

export default function doCorsMe (urlID, whereID, purl, decode = false) {
  let getME
  let elmInnerHTML = document.getElementById(urlID).innerHTML
  if (decode) {
    getME = atob(elmInnerHTML)
  } else {
    getME = elmInnerHTML
  }
  if (!purl.ok) {
    getME = purl.ensureCorrect(getME)
  }
  // return useAxios(getME, whereID)
  try {
    return useFetch(getME, whereID)
  } catch (error) {
    return useAxios(getME, whereID)
  }
}
