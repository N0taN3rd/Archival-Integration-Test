import { Observable } from 'rxjs'
import Promise from 'bluebird'
import constants from '../constants'

const {ServiceWorker} = constants
// SEND_SW_MESSAGE, RECEIVED_SW_MESSAGE, SEND_SW_DM

const gotMessage = event => {
  if (event.data.type === 'ack') {
    return {
      type: ServiceWorker.RECEIVED_SW_MESSAGE,
      m: event.data.m
    }
  } else {
    return {
      type: ServiceWorker.GOT_NETWORK_MESSAGE,
      req: event.data.req
    }
  }
}

const gotDM = whatsUp => ({
  type: ServiceWorker.RECEIVED_SW_DM,
  ...whatsUp
})

const sendDmError = error => ({
  type: ServiceWorker.RECEIVED_SW_DM,
  wasError: false,
  err: error
})

const doSend = message => new Promise((resolve, reject) => {
  console.log('do send ', message)
  if ('serviceWorker' in navigator) {
    if (navigator.serviceWorker.controller) {
      const swMessageChannle = new MessageChannel()
      try {
        swMessageChannle.port1.onmessage = (event) => {
          resolve({
            wasError: false,
            m: event.data
          })
        }
      } catch (err) {
        console.error(err)
        resolve({
          wasError: true,
          m: String(err)
        })
      }
      // Send the message
      try {
        navigator.serviceWorker.controller.postMessage({type: 'dm', m: message}, [swMessageChannle.port2])
      } catch (err) {
        console.error(err)
        resolve({
          wasError: true,
          m: String(err)
        })
      }
    } else {
      console.log('nope')
      resolve({
        wasError: true,
        m: 'ServiceWorkers can not be sent direct messages at this time. Please Refresh the page'
      })
    }
  } else {
    resolve({
      wasError: true,
      m: 'ServiceWorkers are enabled in this browser :('
    })
  }
})

export const sendMessageEpic = action$ =>
  action$.ofType(ServiceWorker.SEND_SW_DM)
    .mergeMap(action => {
      console.log('sw dm epic', action)
      return Observable.fromPromise(doSend(action.message))
          .map(gotDM)
    }
    )

export const startListeningEpic = action$ =>
  action$.ofType(ServiceWorker.LISTEN_FOR_SWM)
    .switchMap(action =>
      Observable.fromEvent(navigator.serviceWorker, 'message')
        .map(event => gotMessage(event))
    )

// export const gotMessageEpic = action$ =>
