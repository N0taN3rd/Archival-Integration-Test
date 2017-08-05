import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NoMatch from '../NoMatch'
import AcidSection from '../AcidSection'
import makeRenderer from '../../util/makeRenderer'
/*
<Route exact path='/' render={makeRenderer(AcidSection)} />
      <Route path='/acidv1' render={makeRenderer(AcidSection)} />
      <Route path='/redirection' render={makeRenderer(AcidSection)} />
      <Route path='/highlyDynamic' render={makeRenderer(AcidSection)} />
 */
export default function Main () {
  return (
    <Switch>
      {
        window.__ROUTE_INFO__.routeConf.map((conf, idx) => (
            <Route
              key={`route-${idx}${conf.path}`}
              exact={conf.exact}
              path={conf.path}
              strict={false}
              render={makeRenderer(AcidSection)}
            />
          )
        )
      }
      <Route component={NoMatch}/>
    </Switch>
  )
}
