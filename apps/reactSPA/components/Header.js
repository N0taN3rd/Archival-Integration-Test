import React from 'react'
import pure from 'recompose/pure'
import { goDynam, goHome } from '../util/backToMain'

function Header () {
  return (
    <nav data-uk-navbar className='uk-navbar-container' data-uk-sticky='media: 960'>
      <div className='uk-navbar-left'>
        <ul className='uk-navbar-nav'>
          <li className='uk-active'><a href='/' onClick={goHome}>Archival Acid Test 2.0</a></li>
          <li><a href='/dynamic' onClick={goDynam}>Dynamic</a></li>
        </ul>
      </div>
      <div className='uk-navbar-right'>
        <ul className='uk-navbar-nav'>
          <li className='uk-active'><a href='#'>Single Page Application</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default pure(Header)
