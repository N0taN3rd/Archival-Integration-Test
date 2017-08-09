import 'babel-polyfill'
import 'uikit/dist/css/uikit.min.css'
import './css/reactSPA.css'
import 'eventsource/example/eventsource-polyfill'
import React from 'react'
import { render } from 'react-dom'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import Root from './containers/Root'

UIkit.use(Icons)

const store = configureStore()

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('app'))

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default
    render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
