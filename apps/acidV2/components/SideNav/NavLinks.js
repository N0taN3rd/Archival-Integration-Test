import React from 'react'
import NavLink from 'react-router-dom/NavLink'

export default function NavLinks () {
  return (
    <ul className='uk-nav uk-nav-default tm-nav'>
      <li>
        <NavLink
          to='/'
        >
          Home
        </NavLink>
      </li>
      <li className='uk-nav-header' style={{ marginBottom: 10 }}>Test Categories</li>
      {
        window.__ROUTE_INFO__.sections[ '/' ].map(({ title, href, actTest }, idx) => {
          if (actTest) {
            return (
              <li
                key={`navLi-${idx}${title}`}
              >
                <a
                  key={`navLink-${idx}${title}`}
                  href={href}
                >
                  {title}
                </a>
              </li>
            )
          } else {
            return (
              <li
                key={`navLi-${idx}${title}`}
              >
                <NavLink
                  key={`navLink-${idx}${title}`}
                  to={href}
                >
                  {title}
                </NavLink>
              </li>
            )
          }
        })
      }
    </ul>
  )
}
