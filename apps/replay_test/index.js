import 'babel-polyfill'
import 'uikit/dist/css/uikit.min.css'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Root from './containers/root'
import createDetectElementResize from './detectElementResize'
import configureStore from './store/configureStore'
injectTapEventPlugin()

const store = configureStore()
window.resizer = createDetectElementResize()

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/root', () => {
    const NewRoot = require('./containers/root').default
    render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
