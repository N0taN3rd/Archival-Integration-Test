import React from 'react'
import moment from 'moment'
import GifLoader from './GifLoader'

export default function Home () {
  const pdate = moment(window.__PDATE__)
  return (
    <div className='uk-container'>
      <article className='uk-article'>
        <h1 className='uk-article-title'>A Real Groovy Single-Page App (SPA)</h1>
        <p className='uk-article-meta'>
          Preserved On <span className='uk-text-bold uk-text-primary'>{pdate.format()}</span>
        </p>
        <p className='uk-text-lead'>A <b>single-page application</b> (<b>SPA</b>) is a <a
          href='https://en.wikipedia.org/wiki/Web_application'
          title='Web application'>web
          application</a> or <a href='https://en.wikipedia.org/wiki/Web_site' title='Web site'>web
          site</a> that fits on a
          single <a href='https://en.wikipedia.org/wiki/Web_page' title='Web page'>web page</a> with the goal of
          providing a <a
            href='https://en.wikipedia.org/wiki/User_experience' title='User experience'>user experience</a> similar to
          that of a <a
            href='https://en.wikipedia.org/wiki/Desktop_application' title='Desktop application'>desktop
            application</a>. In
          an SPA, either all necessary code – <a href='https://en.wikipedia.org/wiki/HTML' title='HTML'>HTML</a>, <a
            href='https://en.wikipedia.org/wiki/JavaScript'
            title='JavaScript'>JavaScript</a>,
          and <a href='https://en.wikipedia.org/wiki/CSS'>CSS</a> – is retrieved with a single page load, or
          the
          appropriate resources are <a href='https://en.wikipedia.org/wiki/Dynamic_loading' title='Dynamic loading'>dynamically
            loaded</a> and
          added to the page as necessary, usually in response to user actions. The page does not reload at any point in
          the process, nor does control transfer to another page, although the <a
            href='https://en.wikipedia.org/wiki/Fragment_identifier'
            title='Fragment identifier'>location
            hash</a> or the <a href='https://en.wikipedia.org/wiki/HTML5' title='HTML5'>HTML5</a> <a
              href='https://en.wikipedia.org/wiki/Comparison_of_layout_engines_(HTML5)#APIs'
              title='Comparison of layout engines (HTML5)'>History
            API</a> can be used to provide the perception and navigability of separate logical pages in the application.
          Interaction with the single page
          application often involves dynamic communication with the <a href='https://en.wikipedia.org/wiki/Web_server'
            title='Web server'>web
            server</a> behind the scenes.</p>
        <p>
          Single-page Application <a href='https://en.wikipedia.org/wiki/Single-page_application'>excerpt</a> From
          Wikipedia, the free encyclopedia
        </p>
      </article>
      <div data-uk-scrollspy='cls: uk-animation-fade; target: > div >; delay: 750; repeat: true'>
        <GifLoader />
      </div>
    </div>
  )
}
