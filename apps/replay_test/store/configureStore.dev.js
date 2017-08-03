import { createStore, compose } from 'redux'
import rootMiddleware from '../middleware'
import rootReducer from '../reducers'
import { Map } from 'immutable'
import * as actionCreators from '../actions'

const getComposer = () => {
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    console.log('we have redux devtools compose')
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionCreators
    })
  } else {
    console.log('we do not have redux devtools compose')
    return compose
  }
}

const configureStore = () => {
  const store = createStore(
    rootReducer,
    Map({}),
    getComposer()(rootMiddleware)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'))
    })
  }

  return store
}

export default configureStore
