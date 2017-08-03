import React, { PropTypes } from 'react'
import CardHeader from 'material-ui/Card/CardHeader'
import { Flex } from 'react-flex'
import pure from 'recompose/pure'

const DisplayNetwork = ({network}) => {
  const head = Array.from(Object.entries(network.req.headers))
  const heads = []
  for (let i = 0; i < head.length; ++i) {
    heads.push(`${head[i][0]}: ${head[i][1]} <br/>`)
  }
  return (
    <Flex row alignItems='center'>
      <CardHeader subtitle={`time: ${network.time.format()}`} />
      <CardHeader subtitle={`method: ${network.req.method}`} />
      <CardHeader subtitle={`mode: ${network.req.mode}`} />
      <CardHeader title='headers' subtitle={<p dangerouslySetInnerHTML={{__html: heads}} />} />
    </Flex>
  )
}

DisplayNetwork.propTypes = {
  network: PropTypes.object.isRequired
}

export default pure(DisplayNetwork)
