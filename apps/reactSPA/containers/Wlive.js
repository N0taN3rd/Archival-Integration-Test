import React from 'react'
import ViewWikEdits from '../components/ViewWikEdits'

function WLive () {
  return (
    <div className='uk-container'>
      <article className='uk-article'>
        <h1 className='uk-article-title'>Viewing Live Wiki Edits Via Event Source</h1>
        <p className='uk-text-lead'>The <strong><code>EventSource</code></strong> interface is used to receive
          server-sent events. It connects to a server over HTTP and receives events in <code>text/event-stream</code>
          format without closing the connection.
          <a href='https://www.w3.org/TR/eventsource/' title='W3C'>W3C Server-Sent Events</a>, <a href='https://html.spec.whatwg.org/multipage/server-sent-events.html#the-eventsource-interface'
            title='Living Spec'>WHATWG Spec</a><br />
        </p>
        <p>
          EventSource Excerpt From The <a href='https://developer.mozilla.org/en-US/docs/Web/API/EventSource' title='MDN'>Mozilla Developer
            Network</a>
        </p>
      </article>
      <ViewWikEdits />
    </div>
  )
}

export default WLive
