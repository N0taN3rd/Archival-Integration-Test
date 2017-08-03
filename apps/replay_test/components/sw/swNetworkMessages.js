import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import DisplayNetwork from './displayNetwork'

const stateToProps = state => ({swNetworkMessageState: state.get('swNetworkMessageState')})

class SwNetworkMesssageList extends Component {
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return this.props.swNetworkMessageState !== nextProps.swNetworkMessageState
  }

  makeLis () {
    let i = 0, len = this.props.swNetworkMessageState.size, messages = []
    if (len === 0) {
      messages.push(<ListItem key={'emptySWMlist'}
        primaryText='No Network Messages received from our ServiceWorker :(' />)
    } else {
      for (; i < len; ++i) {
        let aMessage = this.props.swNetworkMessageState.get(i)
        messages.push(<ListItem
          key={`${i}+${aMessage.req.url}`}
          primaryText={aMessage.req.url}
          secondaryText={<DisplayNetwork key={`${i}+${aMessage.req.url}-displayNet`} network={aMessage} />}
        />)
        if (i + 1 < len) {
          messages.push(<Divider key={`${i}+divider`} />)
        }
      }
    }
    return messages
  }

  render () {
    return (
      <List style={{maxHeight: 200, overflowY: 'auto', paddingTop: 0}}>
        {this.makeLis()}
      </List>
    )
  }
}

SwNetworkMesssageList.propTypes = {
  swNetworkMessageState: PropTypes.object.isRequired
}

export default connect(stateToProps)(SwNetworkMesssageList)
