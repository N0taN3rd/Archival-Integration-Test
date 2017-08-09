import React from 'react'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import Nav from '../components/Nav'
import Main from '../components/Main'

export default function App () {
  return (
    <AppContainer>
      <BrowserRouter>
        <div style={{width: '100vw', height: '100vh'}}>
          <Nav />
          <div className='uk-section uk-section-default'>
            <div className='uk-container'>
              <h1 className='uk-heading-divider uk-text-center'>Test Sections</h1>
              <Main />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AppContainer>
  )
}
