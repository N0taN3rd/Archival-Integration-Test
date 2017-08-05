import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import App from './containers/App'

UIkit.use(Icons)

render(<App />, document.getElementById('app'))

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NewApp = require('./containers/App').default
    render(<NewApp />, document.getElementById('app'))
  })
}
