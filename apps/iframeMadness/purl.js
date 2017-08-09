export default class Purl {
  constructor () {
    this._hostOn = document[Object.keys(document)[0]].host || window.location.host
    this.ok = false
    this._parser = document.createElement('a')
    this._mustStartWith = process.env.MUST_START_WITH
    this._expectedHost = process.env.EXPECTED_HOST
  }

  hostInfo (expectLocation, notifyID) {
    if (this._hostOn !== expectLocation.host) {
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
  }

  ensureCorrectPrefix (it, prefix) {
    this._parser.href = it
    let idx = this._parser.pathname.indexOf(prefix)
    if (idx === -1) {
      return it
    }
    return this._parser.pathname.slice(idx)
  }

  ensureCorrect (it) {
    if (!it.startsWith(this._mustStartWith)) {
      let idx = it.indexOf(this._mustStartWith)
      return it.slice(idx)
    }
    return it
  }
}
