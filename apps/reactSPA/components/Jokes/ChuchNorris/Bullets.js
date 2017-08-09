import React, { Component } from 'react'

class Bullets extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'dev'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this._catOpts = window.__JOKES__.chuckNorris.cats.map(cat => <option key={cat} value={cat}>{cat}</option>)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    this.props.clip$.next(this.state.value)
    event.preventDefault()
  }

  render () {
    return (
      <form className='uk-grid-small uk-child-width-1-2 uk-flex-between' data-uk-grid onSubmit={this.handleSubmit}>
        <div>
          <label className='uk-form-label' style={{marginRight: 10}}>Categories</label>
          <select value={this.state.value} onChange={this.handleChange} className='uk-select uk-width-small' id='chuckCats'>
            {this._catOpts}
          </select>
        </div>
        <button className='uk-button uk-button-default'>Get Me The Funny</button>
      </form>
    )
  }
}

export default Bullets
