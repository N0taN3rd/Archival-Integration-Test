import React, { Component, PropTypes } from 'react'
import { setDisplayName, compose, onlyUpdateForKeys } from 'recompose'
import Inspector from 'react-inspector'

const enhance = compose(
  setDisplayName('DisplayResults'),
  onlyUpdateForKeys(['res'])
)

const DisplayResults = ({res, wasError}) => (
  <div style={{
    margin: 'auto',
    width: '50%',
    padding: '10px'
  }}>
    <div style={{
      maxHeight: 400,
      overflowY: 'auto',
      height: 400
    }}>
      <Inspector style={{width: 300}} data={res} />
      <div>
        <p>Displaying the returned HTML sent by github.io</p>
        {!wasError && <div dangerouslySetInnerHTML={{__html: res.data}} />}
        {(wasError && !res.response) && <p>An error occurred can not display the html :(</p>}
        {(wasError && res.response && res.response.data) &&
        <div dangerouslySetInnerHTML={{__html: res.response.data}} />}
      </div>
    </div>
  </div>
)

DisplayResults.propTypes = {
  res: PropTypes.object.isRequired,
  wasError: PropTypes.bool.isRequired
}

export default enhance(DisplayResults)
