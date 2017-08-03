export default class Purl {
  constructor (expectLocation, notifyID) {
    let n = document[Object.keys(document)[0]].host || window.location.host
    this.ok = true
    if (n !== expectLocation.host) {
      this.ok = false
      let message = `This page is not on the expected host of ${expectLocation.host}`
      message += `<br>Actual ${n}<br>`
      message += 'Adjusting Accordingly'
      document.getElementById(notifyID).innerHTML = `<p class="alert">${message}</p>`
    } else {
      let message = `This page is on the expected host of ${expectLocation.host}`
      message += '<br>No adjustment necessary'
      document.getElementById(notifyID).innerHTML = `<p class="success">${message}</p>`
    }
    this._expectLocation = expectLocation
    this._parser = document.createElement('a')
  }

  ensureCorrectPrefix (it, prefix) {
    this._parser.href = it
    let idx = this._parser.pathname.indexOf(prefix)
    if (idx === -1) {
      return it
    }
    return this._parser.pathname.slice(idx)
  }
}
