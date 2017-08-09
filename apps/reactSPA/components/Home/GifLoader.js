import React, { Component } from 'react'

export default class GifLoader extends Component {
  constructor (props) {
    super(props)
    this._loadTO = null
    this.state = {
      toBeRendered: null
    }
  }

  componentDidMount () {
    this._loadTO = setTimeout(() => {
      clearTimeout(this._loadTO)
      this.setState({
        toBeRendered: (
          <div style={{marginTop: 20}}>
            <article className='uk-article'>
              <h1 className='uk-article-title'>Here have a gif</h1>
              <p className=' uk-text-center'>
                <img src='https://y.yarn.co/b685e9dd-c0a7-446a-a30a-eda16e42bed6_text_hi.gif' alt='' data-uk-gif />
              </p>
            </article>
          </div>
        )
      })
    }, 5000)
  }

  render () {
    return (this.state.toBeRendered)
  }
}
