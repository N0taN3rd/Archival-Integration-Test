import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchChuckJoke } from '../../../actions'
import getDataImmutableOrNative from '../../../util/getDataImmutableOrNative'
import defaultGet from '../../../util/defaultGet'
import HttpResponse from '../../TestStateCards/HttpResponse'
import DisplayUnknownData from '../../TestStateCards/DisplayUnkownData'

const stateToProps = state => ({chuck: state.get('chuck')})
const dispatchToProps = dispatch => bindActionCreators({fetchChuckJoke}, dispatch)

class Gun extends Component {
  constructor (props) {
    super(props)
    this._fetching = null
  }

  componentWillMount () {
    this._clipSub = this.props.clip$.subscribe({
      next: (ammo) => {
        console.log('bang', ammo)
        this.props.fetchChuckJoke(ammo)
      }
    })
  }

  render () {
    if (!this.props.chuck.get('done')) {
      return (<p>Chuck Norris Makes You Laugh!</p>)
    } else {
      if (!this.props.chuck.get('wasError')) {
        const data = this.props.chuck.get('data')
        const iconUrl = defaultGet(data, 'icon_url')
        if (iconUrl) {
          return (
            <div>
              {data.get('value')}<img src={data.get('icon_url')} />
              <HttpResponse
                badge={`HTTP ${this.props.chuck.get('status')} ${this.props.chuck.get('statusText')}`}
                title='Chuck Norris Joke'
                reqUrl={this.props.chuck.get('reqUrl')}
                resUrl={this.props.chuck.get('resUrl')}
                headers={this.props.chuck.get('headers')}
              />
            </div>
          )
        } else {
          return (
            <div>
              <HttpResponse
                badge={`HTTP ${this.props.chuck.get('status')} ${this.props.chuck.get('statusText')}`}
                title='Chuck Norris Joke'
                reqUrl={this.props.chuck.get('reqUrl')}
                resUrl={this.props.chuck.get('resUrl')}
                headers={this.props.chuck.get('headers')}
              />
              <DisplayUnknownData data={getDataImmutableOrNative(data)} danger />
            </div>
          )
        }
      } else {
        if (this.props.chuck.get('hadRes')) {
          return (
            <div>
              <HttpResponse
                badge={`HTTP ${this.props.chuck.get('status')} ${this.props.chuck.get('statusText')}`}
                title='Wiki Live Edits'
                reqUrl={this.props.chuck.get('reqUrl')}
                resUrl={this.props.chuck.get('resUrl')}
                headers={this.props.chuck.get('headers')}
                error
              />
              <DisplayUnknownData data={getDataImmutableOrNative(this.props.chuck.get('data'))} danger />
            </div>
          )
        }
        return (
          <p>{this.props.chuck.get('display')}</p>
        )
      }
    }

    return (
      <p>
        {JSON.stringify(window.__JOKES__.chuckNorris, null, 2)}
        {JSON.stringify(this.props.chuck.toJS(), null, 2)}
      </p>
    )
  }
}

export default connect(stateToProps, dispatchToProps)(Gun)
