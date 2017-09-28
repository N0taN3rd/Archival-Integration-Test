import React from 'react'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import AcidCard from '../AcidCard'
import routeInfo from '../../routeInfo'

const enhance = onlyUpdateForKeys(['location'])

function AcidSection ({location}) {
  const sections = routeInfo[location.pathname]
  const headerText = location.pathname === '/' ? 'Test Categories' : 'Test Sections'
  return [
    <h1 key={`${location.pathname}-h1`} className='uk-heading-divider uk-text-center'>{headerText}</h1>,
    <div key={`${location.pathname}-grid`} className='uk-child-width-1-2@s uk-grid-match' data-uk-grid data-uk-height-match='target: > div > .uk-card'>
      {sections.map((sec, idx) => <AcidCard key={`${location.pathname}${idx}`} {...sec} />)}
    </div>
  ]
}

export default enhance(AcidSection)
