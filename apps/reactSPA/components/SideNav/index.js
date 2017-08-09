import React from 'react'
import NavOffCanvas from './NavOffCanvas'
import NavLinks from './NavLinks'

function SideNav () {
  return (
    <div>
      <NavOffCanvas />
      <div className='tm-sidebar-left uk-visible@m'>
        <NavLinks />
      </div>
    </div>
  )
}

export default SideNav
