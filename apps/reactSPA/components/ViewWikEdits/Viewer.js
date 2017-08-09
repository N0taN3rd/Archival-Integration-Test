import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WikiLiveEdits } from '../../util/index'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/throttle'
import 'rxjs/add/observable/interval'

class Viewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      latest: null
    }
  }

  componentDidMount () {
    this._wikiLiveEdits = new WikiLiveEdits(this.props.apiEndpoint)
    this._eventStream$ = Observable.fromEvent(this._wikiLiveEdits, 'edit')
      .throttle(ev => Observable.interval(500))
      .subscribe(latest => {
        this.setState({latest})
      })
    this._wikiLiveEdits.on('error', error => {
      console.error(error)
    })
  }

  componentWillUnmount () {
    if (this._wikiLiveEdits) {
      this._wikiLiveEdits.close()
    }
  }

  render () {
    if (this.state.latest) {
      // console.log(this.state.latest)
      return (
        <div className='uk-card uk-card-default uk-box-shadow-xlarge'>
          <div className='uk-card-body'>
            <h3 className='uk-card-title'><a href={this.state.latest.meta.uri}>{this.state.latest.meta.uri}</a></h3>
            <div>
              Is Bot: {this.state.latest.bot ? 'Yes' : 'No'}<br />
              {this.state.latest.user && `User: ${this.state.latest.user}`}
              {this.state.latest.user && <br />}
              {this.state.latest.title && `Title: ${this.state.latest.title}`}
              {this.state.latest.title && <br />}
              {this.state.latest.type && `Type: ${this.state.latest.type}`}
              {this.state.latest.type && <br />}
              Date: {String(new Date(this.state.latest.timestamp * 1000))}&nbsp;|&nbsp;{this.state.latest.meta.dt} <br />
              Server Name: <a href={this.state.latest.server_url}>{this.state.latest.server_name}</a><br />
              {this.state.latest.log_action_comment && `Log Action Comment: ${this.state.latest.log_action_comment}`}
              {this.state.latest.log_action_comment && <br />}
              {this.state.latest.comment && `Comment: ${this.state.latest.comment}`}
              {this.state.latest.comment && <br />}
              {this.state.latest.parsedcomment &&
              <div dangerouslySetInnerHTML={{__html: this.state.latest.parsedcomment}} />}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='uk-card uk-card-default uk-box-shadow-xlarge'>
          <div className='uk-card-body'>
            <p>Setting Up</p>
          </div>
        </div>
      )
    }
  }
}

Viewer.propTypes = {
  apiEndpoint: PropTypes.string.isRequired
}

export default Viewer
