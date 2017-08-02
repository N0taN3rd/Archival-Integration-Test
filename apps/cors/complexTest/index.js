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
import Cookies from 'js-cookie'

UIkit.use(Icons)

const client = feathers()
client.configure(hooks())
  .configure(rest('http://localhost:8091').axios(axios))
  .configure(auth({storage: localStorage}))

function feathersAuth () {
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
    })
}

$(document).ready(() => {
  feathersAuth()
})