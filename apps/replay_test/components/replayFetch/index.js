import React from 'react'
import { pure, setDisplayName, compose } from 'recompose'
import FetchGithubApi from './fetchGithubApi'
import FetchLocalImage from './anImage'

const enhance = compose(
  setDisplayName('Fetcher'),
  pure
)

/*
<Card style={{margin: 10}} id="rfc">
    <CardTitle
      titleColor={colors.white}
      subtitleColor={colors.white}
      style={{backgroundColor: colors.teal700}}
      title='Can We Use Fetch?'
      subtitle={subtitle}
    />
    <Flexbox
      flexWrap='wrap'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-around'
    >
      <FetchGithubApi/>
      <FetchLocalImage/>
    </Flexbox>
  </Card>
 */

const Fetcher = enhance(() => (
  <div className='uk-section uk-section-default'>
    <div className='uk-container'>
      <div className='uk-card uk-card-default'>
        <div className='uk-card-body'>
          <h3 className='uk-card-title'>Can We Use Fetch?</h3>
          <p>
            <a href='https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API'>Fetch</a> is a&nbsp;
            <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise'>Promise</a>
            based alternative to XMLHttpRequests (XHR)
            for making HTTP requests via JavaScript. It provides a <a
              href='https://developers.google.com/web/updates/2015/03/introduction-to-fetch'>simpler API</a>, helps to
            avoid&nbsp;
            <a href='http://callbackhell.com/'>callback hell</a> and has been available since: Chrome 42, Edge 14,
            Firefox 39, Opera 29, and Safari 10.1
          </p>
          <div className='uk-child-width-1-2@s uk-grid-match' data-uk-grid>
            <FetchGithubApi />
            <FetchLocalImage />
          </div>
        </div>
      </div>
    </div>
  </div>
))

export default Fetcher
