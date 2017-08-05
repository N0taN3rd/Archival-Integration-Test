import React from 'react'
import Link from 'react-router-dom/Link'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'

const enhance = onlyUpdateForKeys(['title', 'desc', 'href', 'actTest'])

function AcidCard ({title, desc, href, actTest}) {
  let link
  if (actTest) {
    link = (
      <a href={href} className='uk-link'>
        <h3 className='uk-card-title'>
          {title}
        </h3>
      </a>
    )
  } else {
    link = (
      <Link to={href}>
        <h3 className='uk-card-title'>
          {title}
        </h3>
      </Link>
    )
  }
  return (
    <div>
      <div className='uk-card uk-card-default uk-card-hover'>
        <div className='uk-card-body'>
          {link}
          <p>{desc}</p>
        </div>
      </div>
    </div>
  )
}

AcidCard.defaultProps = {
  actTest: false
}

export default enhance(AcidCard)
