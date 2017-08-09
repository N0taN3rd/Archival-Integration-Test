import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onlyUpdateForKeys, setDisplayName, compose } from 'recompose'
import * as fA from '../../actions/fetchActions'
import numeral from 'numeral'
import Fail from '../http/Fail'

const stateToProps = state => ({
  fetchState: state.get('fetchState')
})

const dispatchToProps = dispatch => bindActionCreators(fA, dispatch)

const enhance = compose(
  setDisplayName('DoFetch'),
  onlyUpdateForKeys(['fetchState'])
)


const doSum = data => {
  const vals = Array.from(Object.entries(data.toJS()))
  let total = 0
  for (const [l, b] of vals) {
    total += b
  }
  let lis = []
  vals.sort(([a1, a2], [b1, b2]) => {
    if (a2 < b2) {
      return 1
    } else if (a2 > b2) {
      return -1
    } else {
      return 0
    }
  })
  for (const [l, b] of vals) {
    lis.push(<li key={`${l}${b}`}>{`${numeral(b / total).format('0.00%')} ${l}`}</li>)
  }
  return lis
}

const DoFetch = (props) => {
  const theUrl = 'https://api.github.com/repos/N0taN3rd/wail/languages'
  if (!props.fetchState.get('done')) {
    props.doFetchGet(theUrl)
    return (<div>
      <div className='uk-card-badge uk-label uk-label-danger'>No!</div>
      <p>Working On It!</p>
    </div>)
  } else {
    if (!props.fetchState.get('wasError')) {
      let headers = []
      for (let [k, v] of props.fetchState.get('res').get('head').toJS()) {
        headers.push(<li key={`${k}${v}`}>{k}: {v}</li>)
      }
      let list
      let fail = false
      try  {
        let sum =  doSum(props.fetchState.get('body'))
        list = (
          <ul className='uk-list uk-list-bullet uk-overflow-auto'>
            {sum}
          </ul>
        )
      } catch (error) {
        fail = true
        list = <Fail/>
      }
      return (
        <div>
          {!fail && <div className='uk-card-badge uk-label uk-label-success'>Yes!</div>}
          {fail && <div className='uk-card-badge uk-label uk-label-danger'>No!</div>}
          {list}
          <p>Headers</p>
          <ul className='uk-list uk-list-bullet uk-overflow-auto'>
            {headers}
          </ul>
        </div>
      )
    } else {
      return (<div>
        <div className='uk-card-badge uk-label uk-label-danger'>No!</div>
        <p>Was Error: {String(props.fetchState.get('err'))}</p>
        <Fail/>
      </div>)
    }
  }
}

DoFetch.propTypes = {
  fetchState: PropTypes.object.isRequired,
  doFetchGet: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(enhance(DoFetch))
