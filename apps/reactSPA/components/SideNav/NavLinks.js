import React from 'react'
import NavLink from 'react-router-dom/NavLink'

export default function NavLinks () {
  return (
    <ul className='uk-nav uk-nav-default tm-nav'>
      <li className='uk-nav-header'>Acid App</li>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/wikiLive'>Live Wiki Edits</NavLink></li>
      <li><NavLink to='/lmgtfy'>Live Let Me Google That For You</NavLink></li>
      <li><NavLink to='/jokes'>Jokes</NavLink></li>
      <li><NavLink to='/info'>Info</NavLink></li>
    </ul>
  )
}
