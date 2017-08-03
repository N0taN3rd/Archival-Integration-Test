import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sendSW_Message, directMessageSw } from '../../actions/serviceWorkerActions'
import CardHeader from 'material-ui/Card/CardHeader'
import constants from '../../constants'
import SwDM from './swDirectMessage'

const {ServiceWorker} = constants
// swInstallState
const stateToProps = state => ({
  installState: state.get('swInstallState')
})
// sendSW_Message

const dispatchToProps = dispatch => bindActionCreators({directMessageSw}, dispatch)

const subtitle = < span>
  This communication relies on navigator.serviceWorker.controller.postMessage which may be rewritten if JavaScript
  rewriting is looking for window.postMessage via a regex.
</span>

class TalkToSw extends Component {
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return this.props.installState !== nextProps.installState
  }

  render () {
    if (this.props.installState.get('state') === ServiceWorker.SW_INSTALL_COMPLETE) {
      this.props.directMessageSw('Hi')
    }
    return (
      <div>
        <CardHeader style={{paddingBottom: 0}} title={'Can we talk to our Service Worker?'} />
        <CardHeader
          style={{paddingTop: 0, paddingBottom: 5}}
          title={"We will be sending a direct message of Hi and expect a reply of \"Hi SW Says 'Hello back!'\""}
          subtitle={subtitle}
        />
        <SwDM />
      </div>
    )
  }
}

TalkToSw.propTypes = {
  installState: PropTypes.object.isRequired,
  directMessageSw: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(TalkToSw)
