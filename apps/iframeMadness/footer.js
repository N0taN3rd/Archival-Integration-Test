import 'babel-polyfill'
import $ from 'jquery'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

UIkit.use(Icons)

function receiveMessage (event) {
  if (event.data && event.data.type) {
    if (event.data.type === 'info') {
      let data = event.data
      if (data.p2) {
        $(`#${data.id}`).empty()
          .append(`<h3 class="uk-card-title">${data.header}</h3>`)
          .append(`<div class="uk-card-badge uk-label ${data.badgeC}">${data.badge}</div>`)
          .append(`<p>${data.p1}</p>`)
          .append(`<p>${data.p2}</p>`)
      } else {
        $(`#${data.id}`).empty()
          .append(`<h3 class="uk-card-title">${data.header}</h3>`)
          .append(`<div class="uk-card-badge uk-label ${data.badgeC}">${data.badge}</div>`)
          .append(`<p>${data.p1}</p>`)
      }
    }
  }
}

$(document).ready(() => {
  window.addEventListener('message', receiveMessage, false)
  window.parent.postMessage({type: 'alive-footer'}, '*')
})
