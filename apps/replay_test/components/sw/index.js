import React from 'react'
import Card, { CardTitle, CardHeader } from 'material-ui/Card'
import * as colors from 'material-ui/styles/colors'
import { pure, setDisplayName, compose } from 'recompose'
import InstallSW from './installSW'
import TalkToSw from './talkToSw'
import SwNetworkMesssageList from './swNetworkMessages'
import Flexbox from 'flexbox-react'

const enhance = compose(
  setDisplayName('ServiceWorker'),
  pure
)

const networkTitle =
  'As a feature of this page we display the HTTP requests made by the Browser and JavaScript driving this page ' +
  'as seen by our Service Worker. Hopefully the URLs displayed will be rewritten if viewing an archived copy'

const subtitle = (
  <span>Service Workers allow&nbsp;
    <a style={{color: colors.amber500}}
      href='https://serviceworke.rs/caching-strategies.html'>Caching Strategies</a>,&nbsp;
    <a style={{color: colors.amber500}} href='https://serviceworke.rs/web-push.html'>Push</a>&nbsp;<a
      style={{color: colors.amber500}}
      href='https://developer.mozilla.org/en-US/docs/Web/API/Push_API'>API's</a>,&nbsp;
    <a style={{color: colors.amber500}} href='https://serviceworke.rs/offline.html'>Offline
      Detection/Handling</a>,&nbsp;
    <a style={{color: colors.amber500}} href='https://serviceworke.rs/virtual-server.html'>Virtual Servers</a>,
    and <a href='https://serviceworke.rs/' style={{color: colors.amber500}}>more</a> to be used by your page without requiring their business
    logic to be included in the main JavaScript logic for your page. Available since: Chrome 40, Firefox 39, Opera 24.
  </span>
)
// https://crossorigin.me/
const ServiceWorker = enhance(() => (
  <Card style={{margin: 10}}>
    <CardTitle
      titleColor={colors.white}
      subtitleColor={colors.white}
      style={{backgroundColor: colors.teal700}}
      title='Can We Use A Service Worker?'
      subtitle={subtitle} />
    <Flexbox
      flexWrap='wrap'
      flexDirection='row'
      alignItems='flex-start'
      justifyContent='space-between'
      margin='10px'
    >
      <Flexbox
        flexWrap='wrap'
        flexDirection='column'
        maxWidth='50%'
      >
        <InstallSW />
        <TalkToSw />
      </Flexbox>
      <Flexbox
        flexWrap='wrap'
        flexDirection='column'
        maxWidth='50%'
      >
        <CardHeader title={networkTitle} />
        <SwNetworkMesssageList />
      </Flexbox>
    </Flexbox>
  </Card>
))

export default ServiceWorker
