const Promise = require('bluebird')
const serviceList = [{name: '/cors'}]

class Services {
  get (id, prams) {

  }
  find (id, params) {
    console.log(id, params)
    return Promise.resolve(serviceList)
  }
}