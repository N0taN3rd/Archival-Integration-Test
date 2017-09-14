import React from 'react'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import Nav from '../components/Nav'
import SideNav from '../components/SideNav'
import Main from '../components/Main'

export default function App () {
  return (
    <AppContainer>
      <BrowserRouter>
        <div className='uk-offcanvas-content' style={{width: '100vw', height: '100vh'}}>
          <Nav />
          <SideNav />
          <div className='uk-section uk-section-default'>
            <div className='uk-container'>
              <Main />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AppContainer>
  )
}
