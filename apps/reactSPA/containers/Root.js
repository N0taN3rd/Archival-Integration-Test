import PropTypes from 'prop-types'
import React from 'react'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { Provider } from 'react-redux'
import App from './App'

function Root ({store}) {
  return (
    <Provider store={store}>
      <BrowserRouter
        basename='/tests/reactSPA'
      >
        <App />
      </BrowserRouter>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
