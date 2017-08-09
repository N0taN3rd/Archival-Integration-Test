import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onlyUpdateForKeys, setDisplayName, compose } from 'recompose'
import { doLocalImFetchGet } from '../../actions/fetchActions'
import Fail from '../http/Fail'

const stateToProps = state => ({
  fetchLIState: state.get('fetchLIState')
})

const dispatchToProps = dispatch => bindActionCreators({doLocalImFetchGet}, dispatch)

const enhance = compose(
  setDisplayName('FetchLIm'),
  onlyUpdateForKeys(['fetchLIState'])
)
// doFetch('https://api.github.com/repos/N0taN3rd/wail')
const FetchLIm = (props) => {
  const theUrl = 'wsdlFrog.png'
  if (!props.fetchLIState.get('done')) {
    props.doLocalImFetchGet(theUrl)
    return (<div>
      <div className='uk-card-badge uk-label uk-label-danger'>No!</div>
      <p>Working On It!</p>
    </div>)
  } else {
    if (!props.fetchLIState.get('wasError')) {
      let headers = []
      let foundXpower = false
      for (let [k, v] of props.fetchLIState.get('res').get('head').toJS()) {
        headers.push(<li key={`${k}${v}`}>{k}: {v}</li>)
        if (k === 'x-powered-by' && v === 'Express') {
          foundXpower = true
        }
      }
      let blobUrl
      let fail = false
      try {
        blobUrl = <img src={URL.createObjectURL(props.fetchLIState.get('body'))}/>
      } catch (error) {
        blobUrl = <Fail/>
        fail = true
      }
      return (
        <div>
          {!fail && <div className='uk-card-badge uk-label uk-label-success'>Yes!</div>}
          {fail && <div className='uk-card-badge uk-label uk-label-danger'>No!</div>}
          {blobUrl}
          <p>Headers</p>
          <ul className='uk-list uk-list-bullet uk-overflow-auto'>
            {headers}
          </ul>
          {!foundXpower && <p className="uk-text-danger">Where Is My X-Powered-By: Express Header?</p>}
        </div>
      )
    } else {
      return (<div><p>
        Was Error: {String(props.fetchLIState.get('err'))}
      </p>  <Fail/>
      </div>)
    }
  }
}

FetchLIm.propTypes = {
  fetchLIState: PropTypes.object.isRequired,
  doLocalImFetchGet: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(enhance(FetchLIm))
