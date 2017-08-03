import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { CardText, CardHeader } from 'material-ui/Card'

const stateToProps = state => ({swDMMessages: state.get('swDMMessages')})

class SwDirectMessage extends Component {
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return this.props.swDMMessages !== nextProps.swMessageState
  }

  render () {
    let message = 'No Reply from service worker'
    if (this.props.swDMMessages.get('m')) {
      message = `${this.props.swDMMessages.get('m')} received at: ${this.props.swDMMessages.get('time').format()}`
    }
    return (
      <CardText>
        {message}
      </CardText>
    )
  }
}

SwDirectMessage.propTypes = {
  swDMMessages: PropTypes.object.isRequired
}

export default connect(stateToProps)(SwDirectMessage)
