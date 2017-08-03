import Immutable from 'immutable'
import constants from '../constants'
import moment from 'moment'

const {ServiceWorker} = constants

const is_Install = {
  state: ServiceWorker.WAITING_TO_INSTALL_SW,
  report: 'Installing Service Worker'
}

const initialState = {
  installState: ServiceWorker.WAITING_TO_INSTALL_SW,
  report: 'Installing Service Worker'
}

const swInstallReducer = (state = Immutable.fromJS(is_Install), action) => {
  switch (action.type) {
    case ServiceWorker.SW_INSTALL_COMPLETE:
      return state.merge({report: action.report, state: ServiceWorker.SW_INSTALL_COMPLETE})
    case ServiceWorker.INSTALL_SW_CANNOT:
      return state.merge({report: action.report, state: ServiceWorker.INSTALL_SW_CANNOT})
    case ServiceWorker.SW_INSTALL_FAILED:
      return state.merge({report: action.report, err: String(action.err), state: ServiceWorker.SW_INSTALL_FAILED})
    default:
      return state
  }
}

const swMessageReducer = (state = Immutable.List(), action) => {
  switch (action.type) {
    case ServiceWorker.RECEIVED_SW_DM:
      return state.unshift({m: action.m, type: 'dm', time: moment()})
    case ServiceWorker.RECEIVED_SW_MESSAGE:
      return state.unshift({m: action.m, type: 'm', time: moment()})
    default:
      return state
  }
}

const swDMMessageReducer = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ServiceWorker.RECEIVED_SW_DM:
      return state.merge({m: action.m, time: moment()})
    default:
      return state
  }
}

const swNetworkMessageReducer = (state = Immutable.List(), action) => {
  switch (action.type) {
    case ServiceWorker.GOT_NETWORK_MESSAGE:
      return state.unshift({req: action.req, time: moment()})
    default:
      return state
  }
}

const swReducers = {
  swDMMessageReducer,
  swInstallReducer,
  swMessageReducer,
  swNetworkMessageReducer
}

export default swReducers
