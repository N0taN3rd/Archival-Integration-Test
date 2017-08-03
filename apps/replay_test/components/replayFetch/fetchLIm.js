import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onlyUpdateForKeys, setDisplayName, compose } from 'recompose'
import { doLocalImFetchGet } from '../../actions/fetchActions'

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
      return (
        <div>
          <div className='uk-card-badge uk-label uk-label-success'>Yes!</div>
          <img src={URL.createObjectURL(props.fetchLIState.get('body'))} />
        </div>
      )
    } else {
      return (<p>Was Error: {String(props.fetchLIState.get('err'))}</p>)
    }
  }
}

FetchLIm.propTypes = {
  fetchLIState: PropTypes.object.isRequired,
  doLocalImFetchGet: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(enhance(FetchLIm))
