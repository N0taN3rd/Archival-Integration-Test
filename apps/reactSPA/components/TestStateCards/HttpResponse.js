import React from 'react'
import PropTypes from 'prop-types'

function HttpResponse ({badge, title, headers, error, reqUrl, resUrl}) {
  const cname = error ? 'uk-label-danger' : ''
  return (
    <div className='uk-card uk-card-default uk-box-shadow-xlarge'>
      <div className='uk-card-body'>
        <h3 className='uk-card-title'>{title}</h3>
        <div className={`uk-card-badge uk-label ${cname}`}>
          {badge}
        </div>
        <p>
          Request Url: {reqUrl}<br />
          Response Url: {resUrl}
        </p>
        <div>
          <ul className='uk-list uk-list-bullet uk-overflow-auto'>
            {Array.from(Object.entries(headers.toJS())).map(([k, v]) => (
              <li key={`${k}: ${v}`}>{k}: {v}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

HttpResponse.propTypes = {
  reqUrl: PropTypes.string.isRequired,
  resUrl: PropTypes.string.isRequired,
  badge: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  headers: PropTypes.object.isRequired,
  error: PropTypes.bool
}

HttpResponse.defaultProps = {
  error: false
}

export default HttpResponse
