import React from 'react'
import SideNav from '../components/SideNav'
import Header from '../components/Header'
import Main from './Main'

export default function App () {
  return (
    <div className='uk-offcanvas-content'>
      <Header />
      <SideNav />
      <div className='tm-main uk-section uk-section-default'>
        <Main />
      </div>
    </div>
  )
}
