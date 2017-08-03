import React from 'react'
import DocumentDomain from '../components/documentDomain'
import Fetcher from '../components/replayFetch'
import HTTP from '../components/http'
import { pure, setDisplayName, compose } from 'recompose'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

UIkit.use(Icons)

const enhance = compose(
  setDisplayName('App'),
  pure
)

const App = () => (
  <div>
    <nav data-uk-navbar className='uk-navbar-container'>
      <div className='uk-navbar-left'>
        <ul className='uk-navbar-nav'>
          <li className='uk-active'><a href='/'>Archival Acid Test 2.0</a></li>
          <li className='uk-parent'><a href='/highlyDynamic'>Highly Dynamic</a></li>
        </ul>
      </div>
      <div className='uk-navbar-right'>
        <ul className='uk-navbar-nav'>
          <li className='uk-active'><a href='#'>React</a></li>
        </ul>
      </div>
    </nav>
    <div className='uk-section uk-section-default'>
      <div className='uk-container'>
        <Fetcher />
        <DocumentDomain />
        <HTTP />
      </div>
    </div>
  </div>
)

export default enhance(App)
