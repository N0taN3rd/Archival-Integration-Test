class MyLocationObject {
  constructor () {
    this.hash = '#!/bin/node'
    this.origin = 'Crazy Train'
    this.what = 'tahw'
  }

  assign (what) {
    this.what = what
  }
}

class CustomStuff {
  constructor () {
    this.self = {
      postMessage () {

      },
      window: {
        location: 'Funky Town',
        postMessage () {

        }
      }
    }
  }

  get origin () {
    return 'Crazy Train'
  }

  postMessage () {

  }
}
