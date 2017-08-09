import React, { Component } from 'react'
import { Subject } from 'rxjs/Subject'
import Bullets from './Bullets'
import Gun from './Gun'

class GunArsenal extends Component {
  constructor (props) {
    super(props)
    this._clip$ = new Subject()
  }

  render () {
    return (
      <div>
        <div className='uk-card-body'>
          <Gun clip$={this._clip$} />
        </div>
        <div className='uk-card-footer'>
          <Bullets clip$={this._clip$} />
        </div>
      </div>
    )
  }
}

export default GunArsenal
