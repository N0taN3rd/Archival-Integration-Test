import React from 'react'
import Route from 'react-router-dom/Route'
import Redirect from 'react-router-dom/Redirect'
import Switch from 'react-router-dom/Switch'
import makeRenderer from '../util/makeRenderer'
import Wlive from './Wlive'
import Home from '../components/Home'
import LMGTFYLive from './LMGTFYLive'
import HaHa from './HaHa'
import Info from '../components/Info'

export default function Main () {
  return (
    <Switch>
      <Route path='/' exact render={makeRenderer(Home)} />
      <Route path='/wikiLive' render={makeRenderer(Wlive)} />
      <Route path='/lmgtfy' render={makeRenderer(LMGTFYLive)} />
      <Route path='/jokes' render={makeRenderer(HaHa)} />
      <Route path='/info' render={makeRenderer(Info)} />
      <Redirect from='/home' to='/' />
    </Switch>
  )
}
