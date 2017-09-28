import React from 'react'
import pure from 'recompose/pure'
import NavOffCanvas from './NavOffCanvas'
import NavLinks from './NavLinks'

function SideNav () {
  return [
    <NavOffCanvas key='offCanvasNav'/>,
    <div key='navLinksDiv' className='tm-sidebar-left uk-visible@m'>
      <NavLinks key='naveLinksSidebar' />
    </div>
  ]
}

export default pure(SideNav)
