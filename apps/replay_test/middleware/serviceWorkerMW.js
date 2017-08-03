import * as swActions from '../actions/serviceWorkerActions'
import constants from '../constants'
import Promise from 'bluebird'

const {ServiceWorker} = constants

let activeWorker = null

const installServiceWorker = store => next => action => {
  switch (action.type) {
    case ServiceWorker.INSTALL_SW: {
      if ('serviceWorker' in navigator) {
        return navigator.serviceWorker.register('replayTest_SW.js')
          .then((reg) => {
            store.dispatch(swActions.installSWComplete('The ServiceWorker replayTest_SW.js registered successfully.'))
            return reg.active
          })
          .catch(err => {
            console.error(err)
            return next(swActions.installSWFAILED('The ServiceWorker replayTest_SW.js registration failed.', err))
          })
        // if (!navigator.serviceWorker.controller) {
        //   return navigator.serviceWorker.register('replayTest_SW.js')
        //     .then((reg) => {
        //       store.dispatch(swActions.installSWComplete('The ServiceWorker replayTest_SW.js registered successfully.'))
        //     })
        //     .catch(err => {
        //       console.error(err)
        //       return next(swActions.installSWFAILED('The ServiceWorker replayTest_SW.js registration failed.', err))
        //     })
        // } else {
        //   store.dispatch(swActions.installSWComplete('The ServiceWorker replayTest_SW.js registered successfully.'))
        //   break
        // }
      } else {
        return next(swActions.installSWCannot('ServiceWorker is not supported in this browser/client.'))
      }
    }
    case ServiceWorker.SEND_SW_MESSAGE: {
      if ('serviceWorker' in navigator) {
        if (store.getState().get('swInstallState').get('state') === ServiceWorker.SW_INSTALL_COMPLETE) {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({m: action.message, type: 'not_direct'})
            break
          } else {
            // location.reload()
            break
          }
        } else {
          return next(action)
        }
      } else {
        return next(action)
      }
    }
    default:
      return next(action)
  }
}

export default installServiceWorker
