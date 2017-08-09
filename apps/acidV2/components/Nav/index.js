import React from 'react'
import withRouter from 'react-router-dom/withRouter'
import Link from 'react-router-dom/Link'

function Nav ({location}) {
  const ninfo = window.__ROUTE_INFO__.navInfo[location.pathname]
  return (
    <nav data-uk-navbar className='uk-navbar-container' id='nav'>
      <div className='uk-navbar-left'>
        <ul className='uk-navbar-nav'>
          <li className='uk-active'>
            <Link to='/'>Archival Acid Test 2.0</Link>
          </li>
        </ul>
      </div>
      {ninfo && (
        <div className='uk-navbar-right'>
          <ul className='uk-navbar-nav'>
            <li className='uk-active'><a href='#'>{ninfo}</a></li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default withRouter(Nav)
