import React from 'react'
import { pure, setDisplayName, compose } from 'recompose'

const enhance = compose(
  setDisplayName('IntroText'),
  pure
)

const reduxLogo = 'https://camo.githubusercontent.com/f28b5bc7822f1b7bb28a96d8d09e7d79169248fc/687474703a2f2f692e696d6775722e636f6d2f4a65567164514d2e706e67'

const IntroText = enhance(() => (
  <p>
   This site is generated mostly in JS using React&nbsp;
   {<img style={{height: 20}} src='https://facebook.github.io/react/img/logo.svg' />}&nbsp; and&nbsp;
   {<img style={{height: 20}} src={reduxLogo} />} &nbsp; plus friends.<br />
   The goal of this page is to test the archival and replay systems
   abilities by throwing some gotchas at them.<br />There are three versions of this page.
 </p>
))

export default IntroText
