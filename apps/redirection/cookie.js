import 'babel-polyfill'
import $ from 'jquery'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import Cookies from 'js-cookie'

$(document).ready(() => {
  const embedJson = $.parseJSON($('#json').text())
  const cdiv = $('#checkCookie')
  const ua = $('#ua')
  const theCookie = Cookies.get('redirectFin')
  if (theCookie !== null && theCookie !== undefined) {
    const cookieEq = embedJson.expectedCookie === theCookie
    const clazz = cookieEq ? 'uk-text-success' : 'uk-text-danger'
    const matches = cookieEq ? 'does' : 'does not'
    cdiv.append($(`
        <div class="uk-card-badge uk-label">Winning!</div>
        <p class="uk-text-break uk-text-success">The cookie Is Not Null</p>
        <p class="uk-text-break ${clazz}">The cookie ${matches} match the expected cookie</p>
    `))
  } else {
    cdiv.append($(`
        <div class="uk-card-badge uk-label uk-label-danger">Fail!</div>
        <p class="uk-text-break uk-text-danger">Fail no cookie!</p>
    `))
  }
  ua.append($(`<p class="uk-text-break">${embedJson.ua}</p>`))
})