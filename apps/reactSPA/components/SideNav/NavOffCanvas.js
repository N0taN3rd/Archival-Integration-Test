import React from 'react'
import NavLinks from './NavLinks'

export default function NavOffCanvas () {
  return (
    <div>
      <div className='uk-navbar-container tm-navbar-container' data-uk-sticky='media: 960'>
        <div className='uk-container uk-container-expand'>
          <nav className='uk-navbar'>
            <div className='uk-navbar-right'>
              <a className='uk-navbar-toggle uk-hidden@m uk-navbar-toggle-icon uk-light' data-uk-icon='icon: table'
                data-uk-toggle='target: #offcanvas' />
            </div>
          </nav>
        </div>
      </div>
      <div id='offcanvas' data-uk-offcanvas='mode: push; overlay: true'>
        <div className='uk-offcanvas-bar'>
          <div className='uk-panel'>
            <NavLinks />
          </div>
        </div>
      </div>
    </div>
  )
}
