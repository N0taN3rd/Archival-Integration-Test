import React from 'react'
import { pure, setDisplayName, compose } from 'recompose'
import FetchLIm from './fetchLIm'

const enhance = compose(
  setDisplayName('FetchLocalImage'),
  pure
)

export default enhance(() => (
  <div>
    <div className='uk-card uk-card-default uk-box-shadow-xlarge'>
      <div className='uk-card-body'>
        <h3 className='uk-card-title'>Fetch Relative Image?</h3>
        <FetchLIm />
      </div>
    </div>
  </div>
))
