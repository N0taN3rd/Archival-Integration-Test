import React from 'react'
import { pure, setDisplayName, compose } from 'recompose'
import Options from './Options'
import Head from './Head'
import Get from './Get'
import Post from './Post'
import Put from './Put'
import Delete from './Delete'

const enhance = compose(
  setDisplayName('HTTP'),
  pure
)

export default enhance(() => (
  <div className='uk-section uk-section-default'>
    <div className='uk-container'>
      <div className='uk-child-width-1-2@s' data-uk-grid data-uk-height-match='target: > div > .uk-card'>
        <div>
          <Options />
        </div>
        <div>
          <Head />
        </div>
        <div>
          <Get />
        </div>
        <div>
          <Post />
        </div>
        <div>
          <Put />
        </div>
        <div>
          <Delete />
        </div>
      </div>
    </div>
  </div>
))
