import UIkit from 'uikit'

export function notifErr (message) {
  UIkit.notification({
    message,
    status: 'danger',
    pos: 'top-right',
    timeout: 7000
  })
}

export function notifSuccess (message) {
  UIkit.notification({
    message,
    status: 'success',
    pos: 'top-right',
    timeout: 5000
  })
}
