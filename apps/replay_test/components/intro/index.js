import React from 'react'
import { pure, setDisplayName, compose } from 'recompose'
import IntroText from './introText'

const link = 'https://avatars1.githubusercontent.com/u/4416806?v=3&s=200'

const enhance = compose(
  setDisplayName('Intro'),
  pure
)

// Hello, I will be using fetch to retrieve https://api.github.com/repos/N0taN3rd/wail

export default enhance(() => (
  <div className='uk-section uk-section-default'>
    <div className='uk-container'>
      <div className='uk-card uk-card-default uk-card-body'>
        <h3 className='uk-card-title'>Hello, I will be attempting to make archival and replay fail</h3>
        <IntroText />
      </div>
    </div>
  </div>
))
