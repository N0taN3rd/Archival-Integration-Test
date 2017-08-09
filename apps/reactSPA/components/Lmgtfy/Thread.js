import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Subject } from 'rxjs/Subject'

class Thread extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: `Spinning Up Thread For ${this.props.sessionId}`
    }
    this._lmgtfySub$ = null
  }

  componentDidMount () {
    this._lmgtfySub$ = this.props.lmgtfy$.subscribe({
      next: (pm) => {
        if (pm.sessionId === this.props.sessionId) {
          if (pm.type === 'update') {
            this.setState({text: pm.text || 'Empty'})
          } else {
            this._lmgtfySub$.unsubscribe()
            this._lmgtfySub$ = null
            this.props.removeThread(this.props.sessionId, this.state.text)
          }
        }
      }
    })
  }

  componentWillUnmount () {
    if (this._lmgtfySub$) {
      this._lmgtfySub$.unsubscribe()
    }
  }

  render () {
    return (
      <li className='thread-active'>{this.state.text}<span className='cursor blink'>_</span></li>
    )
  }
}

Thread.propTypes = {
  sessionId: PropTypes.string,
  lmgtfy$: PropTypes.instanceOf(Subject),
  removeThread: PropTypes.func
}

export default Thread
