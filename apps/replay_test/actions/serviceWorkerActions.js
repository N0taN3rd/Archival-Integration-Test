import constants from '../constants'
import Promise from 'bluebird'

const {ServiceWorker} = constants

export const installSW = () => ({type: ServiceWorker.INSTALL_SW})

export const installSWCannot = report => ({type: ServiceWorker.INSTALL_SW_CANNOT, report})
export const installSWFAILED = (report, err) => ({type: ServiceWorker.SW_INSTALL_FAILED, err, report})
export const startListeningSW = () => ({type: ServiceWorker.LISTEN_FOR_SWM})
export const sendSW_Message = message => ({type: ServiceWorker.SEND_SW_MESSAGE, message})
export const sendSW_DM = message => ({type: ServiceWorker.SEND_SW_DM, message})
export const installSWComplete = report => dispatch => {
  try {
    dispatch(startListeningSW())
  } catch (err) {
    console.error('listing error', err)
  }
  try {
    dispatch({type: ServiceWorker.SW_INSTALL_COMPLETE, report})
  } catch (err) {
    console.error('install complete err', err)
  }
}

export const directMessageSw = message => ({
  type: ServiceWorker.SEND_SW_DM,
  message
})
