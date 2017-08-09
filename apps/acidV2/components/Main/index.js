import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import NoMatch from '../NoMatch'
import AcidSection from '../AcidSection'
import makeRenderer from '../../util/makeRenderer'

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
      <Route component={NoMatch} />
    </Switch>
  )
}
