import 'babel-polyfill'
import $ from 'jquery'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

UIkit.use(Icons)

$(document).ready(() => {
  console.log('hi')
})
