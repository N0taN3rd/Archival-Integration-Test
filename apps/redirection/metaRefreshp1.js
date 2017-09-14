import 'babel-polyfill'
import $ from 'jquery'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

UIkit.use(Icons)

$(() => {
  let animate = setInterval(() => {
    window.progressbar && (window.progressbar.value += 1)

    if (!window.progressbar || window.progressbar.value >= window.progressbar.max) {
      clearInterval(animate)
    }
  }, 1000)
})
