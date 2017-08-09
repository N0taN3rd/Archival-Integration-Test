import React from 'react'
import Lmgtfy from '../components/Lmgtfy'

function LMGTFYLive () {
  return (
    <div className='uk-container'>
      <article className='uk-article'>
        <h1 className='uk-article-title'>Viewing Live Let Me Google That For You Via WebScockets</h1>
        <p className='uk-text-lead'>
          The <strong><code>WebScocket Protocol</code></strong> enables two-way communication between a client
          running untrusted code in a controlled environment to a remote host
          that has opted-in to communications from that code.  The goal of
          this technology is to provide a mechanism for browser-based
          applications that need two-way communication with servers that does
          not rely on opening multiple HTTP connections (e.g., using
          XMLHttpRequest or iframes and long polling).
        </p>
        <p>
          WebScocket Excerpt From <a href='https://tools.ietf.org/html/rfc6455' title='RFC6455'>RFC 6455</a>
        </p>
      </article>
      <Lmgtfy />
    </div>
  )
}

export default LMGTFYLive
