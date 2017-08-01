import 'babel-polyfill'
import 'uikit/dist/css/uikit.css'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import $ from 'jquery'
import Promise from 'bluebird'
import axios from 'axios'
import random from 'lodash/random'
import { simple, acidApi1 } from './jqTemplates'

const apiKey = '3e75fa0fe8a8ea56a70bfb66a53e9220'
const meth = 'GET'
const url = 'https://api.flickr.com/services/rest/?' +
  'method=flickr.people.getPublicPhotos&' +
  'user_id=32951986%40N05&' +
  'extras=url_q&format=json&nojsoncallback=1&' +
  'api_key=' + apiKey

function loadPhotosJQ () {
  return new Promise((resolve, reject) => {
    let photos = $('#photos')
    // let data = $.parseJSON($('#imjson').text())
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
  instance.defaults.headers.common['Accept'] = 'application/acid.cors-ims-lookup.1+json'
  return instance({
    method: 'GET',
    baseURL: 'http://localhost:8091',
    url: `/serviceCors/randyIm?$skip=${random(1, 95)}&$limit=${random(1, 5)}`,
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
    let acid1Photos = $('#acid1Photos')
    let acid1Status = $('#acid1Status')
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
  document.cookie = 'hey=ho'
  let instance = axios.create()
  instance.defaults.headers.common['Accept'] = 'application/acid.cors-ims-lookup.1+json'
  return instance({
    method: 'GET',
    baseURL: 'http://localhost:8091',
    url: `/serviceCors/randyIm?$skip=${random(1, 95)}&$limit=${random(1, 5)}`,
    headers: {
      'X-Acid-Request': 'acid-cors-photo-api-1',
      // Accept: 'application/acid.cors-ims-lookup.1+json'
      'X-Requested-With': 'acid-axios'
    },
    withCredentials: true
  }).then((response) => {
    console.log(response)
    // const {data} = response
    // let photos = $('#photos-acid1')
    // let cdiv = $(acidApi1.success)
    // photos.empty()
    // photos.append(cdiv)
    // let acid1Photos = $('#acid1Photos')
    // let acid1Status = $('#acid1Status')
    // let head = ''
    // for (let [k, v] of Object.entries(response.headers)) {
    //   head += `${k}: ${v}<br/>`
    // }
    // acid1Status.append($(`
    //      <div class="uk-card-badge uk-label">HTTP ${response.status} ${response.statusText}</div>
    //      <h3>HTTP Headers</h3>
    //     <p class="uk-text-break">${head}</p>
    //   `))
    //
    // let ims = data
    // let i = 0
    // let len = ims.length
    // for (; i < len; i++) {
    //   acid1Photos.append($(`<div>
    //         <a class="uk-inline" href="${ims[i].url_q}">
    //                 <img src="${ims[i].url_q}">
    //         </a>
    //         </div>
    //     `)
    //   )
    // }
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
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    //   let head = ''
    //   for (let [k, v] of Object.entries(error.response.headers)) {
    //     head += `${k}: ${v}<br/>`
    //   }
    //   acid1Status.append($(`
    //      <div class="uk-card-badge uk-label uk-label-danger">HTTP ${error.response.status} ${error.response.statusText}</div>
    //     <div class="uk-child-width-1-2@s" uk-grid>
    //     <div>
    //         <div class="uk-panel">
    //             <h3>HTTP Headers Response</h3>
    //             <p class="uk-text-break">${head}</p></div>
    //         </div>
    //         <div>
    //             <div class="uk-panel">
    //             <h3>${error.response.data.reason}</h3>
    //               <p class="uk-text-break">${error.response.data.message}</p>
    //             </div>
    //         </div>
    //     </div>
    //   `))
    } else if (error.request) {
      console.log(error.request)
    //   acid1Status.append($(`<div class="uk-card-badge uk-label uk-label-danger">No Response</div>`))
    //   acid1Status.append($(`<p class="uk-text-break">Why You Gotta Be Like This Smalls</p>`))
    } else {
    //   // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    //   acid1Status.append($(`<div class="uk-card-badge uk-label uk-label-danger">Really Bad JUJU</div>`))
    //   acid1Status.append($(`<p class="uk-text-break">${error.message}</p>`))
    //
    }
    // console.log(error.config);
  })
}

$(document).ready(loadPhotosApi2)