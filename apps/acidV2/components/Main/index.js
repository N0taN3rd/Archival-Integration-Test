import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NoMatch from '../NoMatch'
import AcidSection from '../AcidSection'
import makeRenderer from '../../util/makeRenderer'

export default function Main () {
  return (
    <Switch>
      <Route exact path='/' render={makeRenderer(AcidSection)} />
      <Route path='/acidv1' render={makeRenderer(AcidSection)} />
      <Route path='/redirection' render={makeRenderer(AcidSection)} />
      <Route path='/highlyDynamic' render={makeRenderer(AcidSection)} />
      <Route component={NoMatch} />
    </Switch>
  )
}
