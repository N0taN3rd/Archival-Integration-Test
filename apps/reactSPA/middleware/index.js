import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

export default applyMiddleware(thunk, promiseMiddleware)
