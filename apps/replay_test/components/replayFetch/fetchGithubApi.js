import React from 'react'
import { pure, setDisplayName, compose } from 'recompose'
import DoFetch from './doFetch'

const enhance = compose(
  setDisplayName('FetchGithubApi'),
  pure
)

export default enhance(() => (
  <div>
    <div className='uk-card uk-card-default uk-box-shadow-xlarge'>
      <div className='uk-card-body'>
        <h3 className='uk-card-title'>Request to the github api?</h3>
        <DoFetch />
      </div>
    </div>
  </div>
))
