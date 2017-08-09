import React from 'react'

export default function makeRenderer (Component) {
  return props => (
    <Component {...props} />
  )
}
