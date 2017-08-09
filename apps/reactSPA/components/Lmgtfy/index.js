import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import { fetchLMGTFY } from '../../actions'
import getDataImmutableOrNative from '../../util/getDataImmutableOrNative'
import defaultGet from '../../util/defaultGet'
import HttpResponse from '../TestStateCards/HttpResponse'
import DisplayUnknownData from '../TestStateCards/DisplayUnkownData'
import Viewer from './Viewer'
import {notifErr} from '../../util/notification'

const stateToProps = state => ({lmgtfyState: state.get('lmgtfy')})

const dispatchToProps = dispatch => bindActionCreators({fetchLMGTFY}, dispatch)

const enhance = onlyUpdateForKeys(['lmgtfyState'])

function Lmgtfy ({lmgtfyState, fetchLMGTFY}) {
  if (!lmgtfyState.get('done')) {
    fetchLMGTFY()
    return <p>Loading</p>
  } else {
    if (!lmgtfyState.get('wasError')) {
      const data = lmgtfyState.get('data')
      const liveLMGTFY = defaultGet(data, 'liveLMGTFY')
      let display
      if (liveLMGTFY) {
        display = (
          <div className='uk-card uk-card-default uk-card-body uk-box-shadow-xlarge'>
            <p>Live Let Me Google That For You. This Is The Internet You Known</p>
            <hr className='uk-divider-icon' />
            <Viewer wsEndpoint={liveLMGTFY} />
            <hr className='uk-divider-icon' />
          </div>
        )
      } else {
        notifErr('The Response For The Let Me Google That For You Live Endpoint From Our Remote Server Is Incorrect')
        display = (
          <DisplayUnknownData data={getDataImmutableOrNative(data)} danger />
        )
      }
      return (
        <div>
          {display}
          <HttpResponse
            badge={`HTTP ${lmgtfyState.get('status')} ${lmgtfyState.get('statusText')}`}
            title='Let Me Google That For You'
            reqUrl={lmgtfyState.get('reqUrl')}
            resUrl={lmgtfyState.get('resUrl')}
            headers={lmgtfyState.get('headers')}
          />
        </div>
      )
    } else {
      if (lmgtfyState.get('hadRes')) {
        return (
          <div>
            <HttpResponse
              badge={`HTTP ${lmgtfyState.get('status')} ${lmgtfyState.get('statusText')}`}
              title='Live Let Me Google That For You'
              reqUrl={lmgtfyState.get('reqUrl')}
              resUrl={lmgtfyState.get('resUrl')}
              headers={lmgtfyState.get('headers')}
              error
            />
            <DisplayUnknownData data={getDataImmutableOrNative(lmgtfyState.get('data'))} danger />
          </div>
        )
      }
      notifErr('The Request For The Let Me Google That For You Live Endpoint From Our Remote Server Encountered An Error')
      return (
        <p>{lmgtfyState.get('display')}</p>
      )
    }
  }
}

Lmgtfy.propTypes = {
  lmgtfyState: PropTypes.object.isRequired,
  fetchLMGTFY: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(enhance(Lmgtfy))
