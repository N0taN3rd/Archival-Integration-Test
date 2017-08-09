import React from 'react'
import PropTypes from 'prop-types'

function DisplayUnknownData ({data, danger}) {
  return (
    <div className='uk-card uk-card-default uk-box-shadow-xlarge'>
      <div className='uk-card-body'>
        <h3 className='uk-card-title'>Unknown Data In Response</h3>
        {danger && <div dangerouslySetInnerHTML={{__html: data}} />}
        {!danger && <p>{data}</p>}
      </div>
    </div>
  )
}

DisplayUnknownData.propTypes = {
  data: PropTypes.any,
  danger: PropTypes.bool
}

DisplayUnknownData.defaultProps = {
  danger: false
}

export default DisplayUnknownData
