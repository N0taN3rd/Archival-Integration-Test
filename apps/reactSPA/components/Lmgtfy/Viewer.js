import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Subject } from 'rxjs/Subject'
import Thread from './Thread'

function messageSplitter (message) {
  var n = message.split('|', 3)
  return {
    type: n[0],
    sessionId: n[1],
    text: n[2]
  }
}

class Viewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      threads: 0
    }
    this._lastTen = []
    this._have = new Map()
    this.removeThread = this.removeThread.bind(this)
  }

  componentDidMount () {
    this._lmgtfyWS = new WebSocket(this.props.wsEndpoint)
    this._lmgtfyWS.addEventListener('open', (event) => {
      console.log(open)
    })
    this._lmgtfy$ = new Subject()
    this._lmgtfyWS.addEventListener('message', (event) => {
      let pm = messageSplitter(event.data)
      if (pm.type === 'update') {
        if (!this._have.has(pm.sessionId)) {
          this._have.set(pm.sessionId, true)
          this.setState({threads: this.state.threads + 1})
        }
        this._lmgtfy$.next(pm)
      } else if (pm.type === 'done') {
        this._lmgtfy$.next(pm)
      }
      // console.log('message', pm)
    })

    this._lmgtfyWS.addEventListener('close', (event) => {
      console.log('close', event.code, event.reason)
      this._lmgtfyWS = null
    })

    this._lmgtfyWS.addEventListener('error', (error) => {
      console.error(error)
    })
  }

  componentWillUnmount () {
    if (this._lmgtfyWS) {
      this._lmgtfyWS.close()
    }
  }

  removeThread (sessionId, text) {
    this._lastTen.push(<li key={text}>{text}</li>)
    if (this._lastTen.length > 10) {
      this._lastTen.shift()
    }
    this._have.delete(sessionId)
    this.setState({threads: this.state.threads - 1})
  }

  render () {
    if (this.state.threads > 0) {
      // console.log(this.state.latest)
      return (
        <ul className='uk-list uk-list-divider'>
          {Array.from(this._have.keys()).map(sessionId => (
            <Thread key={sessionId} sessionId={sessionId} lmgtfy$={this._lmgtfy$} removeThread={this.removeThread} />
          ))}
          {this._lastTen}
        </ul>
      )
    } else {
      return (
        <ul className='uk-list uk-list-divider'>
          <li><code>Waiting For People To Start Let Me Google This For You!</code></li>
          {this._lastTen}
        </ul>
      )
    }
  }
}

Viewer.propTypes = {
  wsEndpoint: PropTypes.string.isRequired
}

export default Viewer
