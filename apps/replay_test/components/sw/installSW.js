import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { installSW } from '../../actions/serviceWorkerActions'
import { CardText, CardHeader } from 'material-ui/Card'
import constants from '../../constants'

const {ServiceWorker} = constants
// swInstallState
const stateToProps = state => ({
  installState: state.get('swInstallState')
})

const dispatchToProps = dispatch => bindActionCreators({installSW}, dispatch)

class InstallSW extends Component {
  componentDidMount () {
    if (this.props.installState.get('state') === ServiceWorker.WAITING_TO_INSTALL_SW) {
      this.props.installSW()
    }
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return this.props.installState !== nextProps.installState
  }

  render () {
    let subtitle
    if (this.props.installState.get('state') === ServiceWorker.SW_INSTALL_FAILED) {
      subtitle = `${this.props.installState.get('report')} ${this.props.installState.get('error')}`
    } else {
      subtitle = this.props.installState.get('report')
    }
    return (
      <CardHeader title='Can we install our Service Worker for the page?' subtitle={subtitle} />
    )
  }
}

InstallSW.propTypes = {
  installState: PropTypes.object.isRequired
}

export default connect(stateToProps, dispatchToProps)(InstallSW)
