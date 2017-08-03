import { createStore, compose } from 'redux'
import rootMiddleware from '../middleware'
import rootReducer from '../reducers'
import { Map } from 'immutable'

const configureStore = () => createStore(
  rootReducer,
  Map({}),
  compose(rootMiddleware)
)

export default configureStore
