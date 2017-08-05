import React from 'react'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import AcidCard from '../AcidCard'
import routeInfo from '../../routeInfo'

const enhance = onlyUpdateForKeys(['location'])

function AcidSection ({location}) {
  const sections = routeInfo[location.pathname]
  return (
    <div className='uk-child-width-1-2@s uk-grid-match' data-uk-grid data-uk-height-match='target: > div > .uk-card'>
      {sections.map((sec, idx) => <AcidCard key={`${location.pathname}${idx}`} {...sec} />)}
    </div>
  )
}

export default enhance(AcidSection)
