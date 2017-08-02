import 'babel-polyfill'
import $ from 'jquery'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import Promise from 'bluebird'
import axios from 'axios'
import feathers from 'feathers/client'
import auth from 'feathers-authentication-client'
import rest from 'feathers-rest/client'
import hooks from 'feathers-hooks'
import localStorage from 'localstorage-memory'
import { simple, acidApi1, acidApi2 } from './jqTemplates'

UIkit.use(Icons)

function loadPhotosJQ () {
  let {apiKey, meth, url} = $.parseJSON($('#flik').text())
  url = url + apiKey
  return new Promise((resolve, reject) => {
    let photos = $('#photos')
    $.ajax(url, {
      type: meth,
      dataType: 'json',
      jsonp: false
    }).done((data, textStatus, jqXHR) => {
      let cdiv = $(simple.success)
      photos.empty()
      photos.append(cdiv)
      let jqPhotos = $('#jqPhotos')
      let jqStatus = $('#jqStatus')
      if (data.stat === 'ok') {
        jqStatus.append($(`
         <div class="uk-card-badge uk-label">HTTP 200 OK</div>
         <h3>HTTP Headers</h3>
        <p class="uk-text-break">${jqXHR.getAllResponseHeaders().trim().split('\n').join('<br/>')}</p>
      `))

        let ims = data.photos.photo
        let i = 0
        let len = ims.length
        for (; i < len; i++) {
          jqPhotos.append($(`<div>
            <a class="uk-inline" href="${ims[i].url_q}">
                    <img src="${ims[i].url_q}">
            </a>  
            </div>   
        `)
          )
        }
      } else {
        $('#test1').removeClass('uk-alert-success').addClass('uk-alert-warning')
        jqPhotos.replaceWith(`<p>${data.message}</p>`)
        let head = jqXHR.getAllResponseHeaders().trim()
        head = head.length > 0 ? head.split('\n').join('<br/>') : "No Headers :'("
        jqStatus.append($(`
         <div class="uk-card-badge uk-label uk-label-danger">${data.stat}</div>
         <h3>HTTP Headers</h3>
        <p class="uk-text-break">${head.join('<br/>')}</p>
      `))
      }
      resolve()
      // bowfinben@cs.com
    })
      .fail((jqXHR, textStatus, errorThrown) => {
        let cdiv = $(simple.fail)
        photos.empty()
        photos.append(cdiv)
        let jqStatus = $('#jqStatus')
        let head = jqXHR.getAllResponseHeaders().trim()
        head = head.length > 0 ? head.split('\n').join('<br/>') : "No Headers :'("
        jqStatus.append($(`<div class="uk-card-badge uk-label uk-label-danger">${jqXHR.status} ${jqXHR.statusText}</div>`))
          .append($(`<h3 class="uk-text-break uk-text-danger">HTTP Headers</h3>`))
          .append($(`<p class="uk-text-danger">${head}</p>`))
          .append($(`<p class=" uk-text-danger">${errorThrown.length > 0 ? errorThrown : 'No Error Text Available'}</p>`))
        resolve()
      })
  })
}

function loadPhotosApi1 () {
  let instance = axios.create()
  instance.defaults.headers.common['Accept'] = 'application/acid.cors-ims-lookup.1'
  return instance({
    method: 'GET',
    baseURL: 'http://localhost:8091',
    url: `/serviceCors/randyIm?$skip=5&$limit=5`,
    headers: {
      'X-Acid-Request': 'acid-cors-photo-api-1',
      // Accept: 'application/acid.cors-ims-lookup.1+json'
      'X-Requested-With': 'acid-axios'
    }
  }).then((response) => {
    const {data} = response
    let photos = $('#photos-acid1')
    let cdiv = $(acidApi1.success)
    photos.empty()
    photos.append(cdiv)
    let clenTest = response.headers['content-length'] !== '1481'
    let ctypTest = response.headers['content-type'] !== 'application/acid.cors-ims-lookup.1'
    let acid1Photos = $('#acid1Photos')
    let acid1Status = $('#acid1Status')
    if (clenTest && ctypTest) {
      $('#test3').removeClass('uk-alert-success').addClass('uk-alert-danger')
      let photoParent = $('#acid2PhotosParent')
      photoParent.empty()
      photoParent.append(data)
      let acid1Status = $('#acid2Status')
      let head = ''
      for (let [k, v] of Object.entries(response.headers)) {
        if (k === 'content-length') {
          head += `<br/>${k}: ${v}<br/><span class="uk-text-danger">expected 306</span><br/><br/>`
        } else if (k === 'content-type') {
          head += `<br/>${k}: ${v}<br/><span class="uk-text-danger">expected application/acid.cors-ims-lookup.2</span><br/><br/>`
        } else {
          head += `${k}: ${v}<br/>`
        }
      }
      acid1Status.append($(`
         <div class="uk-card-badge uk-label uk-label-danger">Wrong Content-X</div>
         <p>HTTP ${response.status} ${response.statusText}</p>
         <h3>HTTP Headers</h3>
        <p class="uk-text-break">${head}</p>
      `))
      if (!response.headers['content-length']) {
        acid1Status.append($('<p class="uk-text-break uk-text-danger">No Content-Length</p>'))
      }
      if (!response.headers['content-type']) {
        acid1Status.append($('<p class="uk-text-break uk-text-danger">No Content-Type</p>'))
      }
    } else if (clenTest) {
      $('#test3').removeClass('uk-alert-success').addClass('uk-alert-danger')
      let photoParent = $('#acid2PhotosParent')
      photoParent.empty()
      photoParent.append(data)
      let acid1Status = $('#acid2Status')
      let head = ''
      for (let [k, v] of Object.entries(response.headers)) {
        if (k === 'content-length') {
          head += `<br/>${k}: ${v}<br/><span class="uk-text-danger">expected 306</span><br/><br/>`
        } else {
          head += `${k}: ${v}<br/>`
        }
      }
      acid1Status.append($(`
         <div class="uk-card-badge uk-label uk-label-danger">Wrong Content-Length</div>
         <p>HTTP ${response.status} ${response.statusText}</p>
         <h3>HTTP Headers</h3>
        <p class="uk-text-break">${head}</p>
      `))
      if (!response.headers['content-length']) {
        acid1Status.append($('<p class="uk-text-break uk-text-danger">No Content-Length</p>'))
      }
    } else if (ctypTest) {
      $('#test3').removeClass('uk-alert-success').addClass('uk-alert-danger')
      let photoParent = $('#acid2PhotosParent')
      photoParent.empty()
      photoParent.append(data)
      let acid1Status = $('#acid2Status')
      let head = ''
      for (let [k, v] of Object.entries(response.headers)) {
        if (k === 'content-type') {
          head += `<br/>${k}: ${v}<br/><span class="uk-text-danger">expected application/acid.cors-ims-lookup.2</span><br/><br/>`
        } else {
          head += `${k}: ${v}<br/>`
        }
      }
      acid1Status.append($(`
         <div class="uk-card-badge uk-label uk-label-danger">Wrong Content-Type</div>
         <p>HTTP ${response.status} ${response.statusText}</p>
         <h3>HTTP Headers</h3>
        <p class="uk-text-break">${head}</p>
      `))
      if (!response.headers['content-type']) {
        acid1Status.append($('<p class="uk-text-break uk-text-danger">No Content-Type</p>'))
      }
    } else {
      let head = ''
      for (let [k, v] of Object.entries(response.headers)) {
        head += `${k}: ${v}<br/>`
      }
      acid1Status.append($(`
         <div class="uk-card-badge uk-label">HTTP ${response.status} ${response.statusText}</div>
         <h3>HTTP Headers</h3>
        <p class="uk-text-break">${head}</p>
      `))

      let ims = data
      let i = 0
      let len = ims.length
      for (; i < len; i++) {
        acid1Photos.append($(`<div>
            <a class="uk-inline" href="${ims[i].url_q}">
                    <img src="${ims[i].url_q}">
            </a>  
            </div>   
        `)
        )
      }
    }
  }).catch(error => {
    // console.log(error)
    let photos = $('#photos-acid1')
    let cdiv = $(acidApi1.fail)
    photos.empty()
    photos.append(cdiv)
    let acid1Status = $('#acid1Status')
    $('#test2').removeClass('uk-alert-success').addClass('uk-alert-warning')
    if (error.response) {
      // // The request was made and the server responded with a status code
      // // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      let head = ''
      for (let [k, v] of Object.entries(error.response.headers)) {
        head += `${k}: ${v}<br/>`
      }
      acid1Status.append($(`
         <div class="uk-card-badge uk-label uk-label-danger">HTTP ${error.response.status} ${error.response.statusText}</div>
        <div class="uk-child-width-1-2@s" uk-grid>
        <div>
            <div class="uk-panel">  
                <h3>HTTP Headers Response</h3>
                <p class="uk-text-break">${head}</p></div>
            </div>
            <div>
                <div class="uk-panel">
                <h3>${error.response.data.reason}</h3>
                  <p class="uk-text-break">${error.response.data.message}</p>
                </div>
            </div>
        </div>
      `))
    } else if (error.request) {
      // console.log(error.request)
      acid1Status.append($(`<div class="uk-card-badge uk-label uk-label-danger">No Response</div>`))
      acid1Status.append($(`<p class="uk-text-break">Why You Gotta Be Like This Smalls</p>`))
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', error.message);
      acid1Status.append($(`<div class="uk-card-badge uk-label uk-label-danger">Really Bad JUJU</div>`))
      acid1Status.append($(`<p class="uk-text-break">${error.message}</p>`))

    }
    console.log(error.config);
  })
}

function loadPhotosApi2 () {
  let instance = axios.create()
  instance.defaults.headers.common['Accept'] = 'application/acid.cors-ims-lookup.2'
  return instance({
    method: 'GET',
    baseURL: 'http://localhost:8091',
    url: `/serviceCors/randyImCred?$limit=${1}`,
    headers: {
      'X-Acid-Request': 'acid-cors-photo-api-2',
      // Accept: 'application/acid.cors-ims-lookup.1+json'
      'X-Requested-With': 'acid-axios-with-cred'
    },
    withCredentials: true
  }).then((response) => {
    const {data} = response
    let photos = $('#photos-acid2')
    let cdiv = $(acidApi2.success)
    photos.empty()
    photos.append(cdiv)
    let clenTest = response.headers['content-length'] !== '306'
    let ctypTest = response.headers['content-type'] !== 'application/acid.cors-ims-lookup.2'
    if (clenTest && ctypTest) {
      $('#test3').removeClass('uk-alert-success').addClass('uk-alert-danger')
      let photoParent = $('#acid2PhotosParent')
      photoParent.empty()
      photoParent.append(data)
      let acid1Status = $('#acid2Status')
      let head = ''
      for (let [k, v] of Object.entries(response.headers)) {
        if (k === 'content-length') {
          head += `<br/>${k}: ${v}<br/><span class="uk-text-danger">expected 306</span><br/><br/>`
        } else if (k === 'content-type') {
          head += `<br/>${k}: ${v}<br/><span class="uk-text-danger">expected application/acid.cors-ims-lookup.2</span><br/><br/>`
        } else {
          head += `${k}: ${v}<br/>`
        }
      }
      acid1Status.append($(`
         <div class="uk-card-badge uk-label uk-label-danger">Wrong Content-X</div>
         <p>HTTP ${response.status} ${response.statusText}</p>
         <h3>HTTP Headers</h3>
        <p class="uk-text-break">${head}</p>
      `))
      if (!response.headers['content-length']) {
        acid1Status.append($('<p class="uk-text-break uk-text-danger">No Content-Length</p>'))
      }
      if (!response.headers['content-type']) {
        acid1Status.append($('<p class="uk-text-break uk-text-danger">No Content-Type</p>'))
      }
    } else if (clenTest) {
      $('#test3').removeClass('uk-alert-success').addClass('uk-alert-danger')
      let photoParent = $('#acid2PhotosParent')
      photoParent.empty()
      photoParent.append(data)
      let acid1Status = $('#acid2Status')
      let head = ''
      for (let [k, v] of Object.entries(response.headers)) {
        if (k === 'content-length') {
          head += `<br/>${k}: ${v}<br/><span class="uk-text-danger">expected 306</span><br/><br/>`
        } else {
          head += `${k}: ${v}<br/>`
        }
      }
      acid1Status.append($(`
         <div class="uk-card-badge uk-label uk-label-danger">Wrong Content-Length</div>
         <p>HTTP ${response.status} ${response.statusText}</p>
         <h3>HTTP Headers</h3>
        <p class="uk-text-break">${head}</p>
      `))
      if (!response.headers['content-length']) {
        acid1Status.append($('<p class="uk-text-break uk-text-danger">No Content-Length</p>'))
      }
    } else if (ctypTest) {
      $('#test3').removeClass('uk-alert-success').addClass('uk-alert-danger')
      let photoParent = $('#acid2PhotosParent')
      photoParent.empty()
      photoParent.append(data)
      let acid1Status = $('#acid2Status')
      let head = ''
      for (let [k, v] of Object.entries(response.headers)) {
        if (k === 'content-type') {
          head += `<br/>${k}: ${v}<br/><span class="uk-text-danger">expected application/acid.cors-ims-lookup.2</span><br/><br/>`
        } else {
          head += `${k}: ${v}<br/>`
        }
      }
      acid1Status.append($(`
         <div class="uk-card-badge uk-label uk-label-danger">Wrong Content-Type</div>
         <p>HTTP ${response.status} ${response.statusText}</p>
         <h3>HTTP Headers</h3>
        <p class="uk-text-break">${head}</p>
      `))
      if (!response.headers['content-type']) {
        acid1Status.append($('<p class="uk-text-break uk-text-danger">No Content-Type</p>'))
      }
    } else {
      let acid1Photos = $('#acid2Photos')
      let acid1Status = $('#acid2Status')
      let head = ''
      for (let [k, v] of Object.entries(response.headers)) {
        head += `${k}: ${v}<br/>`
      }
      acid1Status.append($(`
         <div class="uk-card-badge uk-label">HTTP ${response.status} ${response.statusText}</div>
         <h3>HTTP Headers</h3>
        <p class="uk-text-break">${head}</p>
      `))

      let ims = data
      let i = 0
      let len = ims.length
      for (; i < len; i++) {
        acid1Photos.append($(`<div>
            <a class="uk-inline" href="${ims[i].url_q}">
                    <img src="${ims[i].url_q}">
            </a>
            </div>
        `)
        )
      }
    }
  }).catch(error => {
    // console.log(error)
    let photos = $('#photos-acid2')
    let cdiv = $(acidApi2.fail)
    photos.empty()
    photos.append(cdiv)
    let acid1Status = $('#acid2Status')
    $('#test2').removeClass('uk-alert-success').addClass('uk-alert-warning')
    if (error.response) {
      // // The request was made and the server responded with a status code
      // // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      let head = ''
      for (let [k, v] of Object.entries(error.response.headers)) {
        head += `${k}: ${v}<br/>`
      }
      acid1Status.append($(`
         <div class="uk-card-badge uk-label uk-label-danger">HTTP ${error.response.status} ${error.response.statusText}</div>
        <div class="uk-child-width-1-2@s" uk-grid>
        <div>
            <div class="uk-panel">
                <h3>HTTP Headers Response</h3>
                <p class="uk-text-break">${head}</p></div>
            </div>
            <div>
                <div class="uk-panel">
                <h3>${error.response.data.reason}</h3>
                  <p class="uk-text-break">${error.response.data.message}</p>
                </div>
            </div>
        </div>
      `))
    } else if (error.request) {
      console.log(error.request)
      acid1Status.append($(`<div class="uk-card-badge uk-label uk-label-danger">No Response</div>`))
      acid1Status.append($(`<p class="uk-text-break">Why You Gotta Be Like This Smalls</p>`))
    } else {
      //   // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      acid1Status.append($(`<div class="uk-card-badge uk-label uk-label-danger">Really Bad JUJU</div>`))
      acid1Status.append($(`<p class="uk-text-break">${error.message}</p>`))
      //
    }
    // console.log(error.config);
  })
}

function feathersAuth () {
  const client = feathers()
  client.configure(hooks())
    .configure(rest('http://localhost:8091').axios(axios))
    .configure(auth({storage: localStorage}))
  return new Promise((resolve, reject) => {
    let state = 'Making Auth Request'
    $('#authState').text(state)
    client.authenticate({
      strategy: 'acid-local',
      email: 'rivalDealer@acid.test',
      password: 'InfectedMushroom'
    })
      .then(response => {
        console.log('Authenticated!', response)
        state = 'Verifying Token'
        $('#authState').text(state)
        $('#auth').removeClass('uk-text-danger').addClass('uk-text-success').text('Yes!')
        return client.passport.verifyJWT(response.accessToken)
      })
      .then(payload => {
        state = 'Retrieving User'
        $('#authState').text(state)
        console.log('JWT Payload', payload);
        $('#tokenValid').removeClass('uk-text-danger').addClass('uk-text-success').text('Yes!')
        return client.service('users').get(payload.userId)
      })
      .then(user => {
        state = 'Got User'
        $('#authState').addClass('uk-text-success').text(state)
        client.set('user', user);
        $('#getUsr').removeClass('uk-text-danger').addClass('uk-text-success').text('Yes!')
        let puser = client.get('user')
        console.log('User', puser)
        $('#authErrorOrUser').append($(`<div class="uk-card-badge uk-label">Winning!</div>`))
          .append($(`<p>
             userId: ${puser.id}<br/>   
             email: ${puser.email}<br/>   
             permissions: ${puser.permissions.join('')}<br/>   
        </p>`))
        resolve()
      })
      .catch(function (error) {
        $('#authState').addClass('uk-text-danger').text(`Error! ${state}`)
        $('#cauthHead').addClass('uk-text-danger')
        if (error.code) {
          $('#authErrorOrUser').append($(`<div class="uk-card-badge uk-label uk-label-danger">HTTP ${error.code}</div>`))
            .append($(`<p>
        ${error.name}: ${error.message}
      </p>`))
        } else {
          $('#authErrorOrUser').append($(`<div class="uk-card-badge uk-label uk-label-danger">Bad JUJU</div>`))
            .append($(`<p>${error instanceof Error ? error : JSON.stringify(error)}</p>`))
        }
        console.error('Error authenticating!', error)
        resolve()
      })
  })
}

$(document).ready(() => {
  // I do not want to use babel for async!
  // I got reasons yo
  Promise.map([1, 2, 3, 4], (idx) => new Promise((resolve, reject) => {
    if (idx === 1) {
      return loadPhotosJQ().then(() => resolve())
        .catch(error => {
          $('#errorContainer').removeClass('uk-invisible')
          $('#errors').append(`<p class="uk-text-break uk-text-danger">Request To Another Domain api.flickr.com ${error}</p>`)
          resolve()
        })
    } else if (idx === 2) {
      return loadPhotosApi1().then(() => resolve())
        .catch(error => {
          $('#errorContainer').removeClass('uk-invisible')
          $('#errors').append(`<p class="uk-text-break uk-text-danger">Request With Custom Accept Value and X Header ${error}</p>`)
          resolve()
        })
    } else if (idx === 3) {
      return loadPhotosApi2().then(() => resolve())
        .catch(error => {
          $('#errorContainer').removeClass('uk-invisible')
          $('#errors').append(`<p class="uk-text-break uk-text-danger">Request With Credential ${error}</p>`)
          resolve()
        })
    } else if (idx === 4) {
      return feathersAuth().then(() => resolve())
        .catch(error => {
          $('#errorContainer').removeClass('uk-invisible')
          $('#errors').append(`<p class="uk-text-break uk-text-danger">Authing ${error}</p>`)
          resolve()
        })
    } else {
      resolve()
    }
  }), {concurrency: 1}).then(() => {
    console.log('Done!')
  }).catch(error => {
    console.error(error)
  })
})