import React, { Component } from 'react'

export default class Info extends Component {
  componentDidMount () {
    eval('!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");')
    !(function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'
      if (!d.getElementById(id)) {
        js = d.createElement(s)
        js.id = id
        js.src = p + '://platform.twitter.com/widgets.js'
        fjs.parentNode.insertBefore(js, fjs)
      }
    }(document, 'script', 'twitter-wjs'))
  }

  render () {
    return (
      <div className='uk-container'>
        <article className='uk-article'>
          <h1 className='uk-article-title'>Information</h1>
          <p className='uk-text-lead'>
            About The <a href='http://ws-dl.blogspot.com/'>Web Science and Digital Library Research Group</a>
          </p>
        </article>
        <div className='uk-flex-around' data-uk-grid>
          <div className='uk-width-1-2 uk-overflow-auto' style={{height: 550}}>
            <a className='twitter-timeline' href='https://twitter.com/weiglemc'>Tweets by @weiglemc</a>
          </div>
          <a className='twitter-timeline' href='https://twitter.com/phonedude_mln' data-widget-id='347095306439118849'>Tweets by @phonedude_mln</a>
          <a className='twitter-timeline' href='//twitter.com/WebSciDL' data-widget-id='466005496655147008'>Tweets by
            @WebSciDL</a>
          <iframe
            src='//www.flickr.com/slideShow/index.gne?group_id=&amp;user_id=124419986@N07&amp;set_id=72157656178444675&amp;text='
            frameBorder='0' width='400' height='400' scrolling='no' />
        </div>
        <script async src='//platform.twitter.com/widgets.js' charSet='utf-8' />
      </div>
    )
  }
}
