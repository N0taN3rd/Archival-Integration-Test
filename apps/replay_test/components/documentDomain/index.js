import React from 'react'
import { pure, setDisplayName, compose } from 'recompose'

const enhance = compose(
  setDisplayName('DocumentDomain'),
  pure
)

const canSet = () => {
  try {
    window.document.domain = window.location.hostname
  } catch (err) {
    return {
      display: 'none'
    }
  }
  return {}
}

export default enhance(() => {
  const iStyle = canSet()
  const good = !iStyle.display
  return (
    <div className='uk-section uk-section-default'>
      <div className='uk-container'>
        <div className='uk-card uk-card-default uk-box-shadow-xlarge'>
          <div className='uk-card-body'>
            {!good && <div className='uk-card-badge uk-label uk-label-danger'>Fail!</div>}
            {good && <div className='uk-card-badge uk-label uk-label-success'>We Can!</div>}
            <h3 className='uk-card-title'>Can I Set window.document.domain={window.location.hostname}</h3>
            <p> This trick is used to avoid CORS when talking to a CDN or other services on a subdomain/superdomain of the
              current webpage.
              For more information consider this blog post <a
                href='http://ws-dl.blogspot.com/2017/01/2017-01-20-cnncom-has-been-unarchivable.html'>2017-01-20: CNN.com
                has been unarchivable since November 1st, 2016.</a> If it can you will see an image below.</p>
          </div>
          <div className='uk-card-media-bottom uk-text-center' style={iStyle}>
            <img style={{height: 250}} src='https://i.imgflip.com/1kh9o4.jpg' />
          </div>
        </div>
      </div>
    </div>
  )
})
