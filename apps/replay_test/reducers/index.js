import { combineReducers } from 'redux-immutable'
import { filterActions } from 'redux-ignore'
import { fetchGitApi, fetchLocalIm } from './fetchReducer'
import swReducers from './swReducer'
import constants from '../constants'

const {swInstallReducer, swMessageReducer, swNetworkMessageReducer, swDMMessageReducer} = swReducers

const {ServiceWorker} = constants
const installActions = ['@@INIT', ServiceWorker.SW_INSTALL_COMPLETE, ServiceWorker.INSTALL_SW, ServiceWorker.INSTALL_SW_CANNOT, ServiceWorker.SW_INSTALL_FAILED]
const swMessageActions = ['@@INIT', ServiceWorker.RECEIVED_SW_DM, ServiceWorker.RECEIVED_SW_MESSAGE]

const rootReducer = combineReducers({
  fetchState: filterActions(fetchGitApi, Object.values(constants.FetchGet)),
  fetchLIState: filterActions(fetchLocalIm, Object.values(constants.FetchLocalImage)),
  swInstallState: filterActions(swInstallReducer, installActions),
  swMessageState: filterActions(swMessageReducer, swMessageActions),
  swNetworkMessageState: filterActions(swNetworkMessageReducer, [ServiceWorker.GOT_NETWORK_MESSAGE]),
  swDMMessages: filterActions(swDMMessageReducer, [ServiceWorker.RECEIVED_SW_DM])
})

export default rootReducer
