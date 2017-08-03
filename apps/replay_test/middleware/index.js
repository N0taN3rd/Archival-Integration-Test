import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from '../epics'
import installServiceWorker from './serviceWorkerMW'

const epicMiddleware = createEpicMiddleware(rootEpic)

const rootMiddleware = applyMiddleware(thunk, promiseMiddleware, epicMiddleware)

export default rootMiddleware
