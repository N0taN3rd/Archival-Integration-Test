import EventEmitter from 'eventemitter3'

export class WikiLiveEdits extends EventEmitter {
  constructor (apiEndPoint) {
    super()
    this._apiEndPoint = apiEndPoint
    this._src = new window.EventSource(this._apiEndPoint)
    this._src.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data)
        this.emit('edit', data)
      } catch (error) {
        this.emit('error', error)
      }
    }

    this._src.onerror = (error) => {
      this.emit('com-error', error)
    }
  }

  close () {
    this._src.close()
  }

  get endPoint () {
    return this._apiEndPoint
  }

  get src () {
    return this._src
  }
}
