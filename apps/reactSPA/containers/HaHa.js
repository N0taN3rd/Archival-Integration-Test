import React from 'react'
import ChuckNorris from '../components/Jokes/ChuchNorris'

export default function HaHa () {
  return (
    <div className='uk-container'>
      <article className='uk-article'>
        <h1 className='uk-article-title'>Jokes A From Remote Server</h1>
        <p className='uk-text-lead'>
          Everyone Loves A Good Laugh. But Sometimes The Funny Comes From A Server Running SQL
          Who's Queries Must Go Into A Bar To Ask Two Tables, "Can I Join You?"
        </p>
      </article>
      <ChuckNorris />
    </div>
  )
}
