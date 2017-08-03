import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sendSW_Message, directMessageSw } from '../../actions/serviceWorkerActions'
import CardHeader from 'material-ui/Card/CardHeader'
import constants from '../../constants'
import SwMesssageList from './swDirectMessage'

const {ServiceWorker} = constants
// swInstallState
const stateToProps = state => ({
  installState: state.get('swInstallState')
})
// sendSW_Message

const dispatchToProps = dispatch => bindActionCreators({sendSW_Message}, dispatch)

class TalkToSw extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      message: null,
      subtitle: 'Sending Message Hi'
    }
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return this.props.installState !== nextProps.installState
  }

  componentDidMount () {
    directMessageSw('hi').then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }

  render () {
    let subtitle
    if (this.props.installState.get('state') === ServiceWorker.SW_INSTALL_COMPLETE) {
      subtitle = 'Sending Message Hi'
      this.props.sendSW_Message('Hi')
    } else {
      subtitle = this.props.installState.get('report')
    }
    return (
      <div>
        <CardHeader title='Can we talk to our Service Worker?'
          subtitle={"We will be sending a direct message of hi and expect a reply of \"hi SW Says 'Hello back!'\""} />
        <SwMesssageList />
      </div>
    )
  }
}

TalkToSw.propTypes = {
  installState: PropTypes.object.isRequired,
  sendSW_Message: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(TalkToSw)
