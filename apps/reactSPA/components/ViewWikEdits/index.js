import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import { fetchWikiLE } from '../../actions'
import getDataImmutableOrNative from '../../util/getDataImmutableOrNative'
import defaultGet from '../../util/defaultGet'
import Viewer from './Viewer'
import HttpResponse from '../TestStateCards/HttpResponse'
import DisplayUnknownData from '../TestStateCards/DisplayUnkownData'
import {notifErr} from '../../util/notification'

const stateToProps = state => ({wikiState: state.get('wiki')})
const dispatchToProps = dispatch => bindActionCreators({fetchWikiLE}, dispatch)
const enhance = onlyUpdateForKeys(['wikiState'])

function ViewWikiEdits ({wikiState, fetchWikiLE}) {
  if (!wikiState.get('done')) {
    fetchWikiLE()
    return <p>Loading</p>
  } else {
    if (!wikiState.get('wasError')) {
      const data = wikiState.get('data')
      const wle = defaultGet(data, 'wle')
      let display
      if (wle) {
        display = (
          <Viewer apiEndpoint={wle} />
        )
      } else {
        notifErr('The Response For The Wiki Live Edits Endpoint From Our Remote Server Is Incorrect')
        display = (
          <DisplayUnknownData data={getDataImmutableOrNative(data)} danger />
        )
      }
      return (
        <div>
          <HttpResponse
            badge={`HTTP ${wikiState.get('status')} ${wikiState.get('statusText')}`}
            title='Wiki Live Edits'
            reqUrl={wikiState.get('reqUrl')}
            resUrl={wikiState.get('resUrl')}
            headers={wikiState.get('headers')}
          />
          {display}
        </div>
      )
    } else {
      if (wikiState.get('hadRes')) {
        return (
          <div>
            <HttpResponse
              badge={`HTTP ${wikiState.get('status')} ${wikiState.get('statusText')}`}
              title='Wiki Live Edits'
              reqUrl={wikiState.get('reqUrl')}
              resUrl={wikiState.get('resUrl')}
              headers={wikiState.get('headers')}
              error
            />
            <DisplayUnknownData data={getDataImmutableOrNative(wikiState.get('data'))} danger />
          </div>
        )
      }
      notifErr('There Was An Error When Requesting The Wiki Live Edits Endpoint From Our Remote Server')
      return (
        <p>{wikiState.get('display')}</p>
      )
    }
  }
}

ViewWikiEdits.propTypes = {
  wikiState: PropTypes.object.isRequired,
  fetchWikiLE: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(enhance(ViewWikiEdits))
