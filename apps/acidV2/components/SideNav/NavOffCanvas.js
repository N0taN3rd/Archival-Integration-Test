import React from 'react'
import NavLinks from './NavLinks'

export default function NavOffCanvas () {
  return (
    <div id='offcanvas' data-uk-offcanvas='mode: push; overlay: true'>
      <div className='uk-offcanvas-bar'>
        <div className='uk-panel'>
          <NavLinks />
        </div>
      </div>
    </div>
  )
}
