const local = require('feathers-authentication-local')
const auth = require('feathers-authentication')
const configDb = require('./db')
const {checkHeaders, CORService} = require('./cors')

const superUser = {
  email: 'rivalDealer@acid.test',
  password: 'InfectedMushroom',
  permissions: ['*']
}

module.exports = function () {
  return function () {
    configDb(this)
    // this.options('/cors', cors())
    this.use('/serviceCors', checkHeaders, new CORService())
    this.service('authentication').hooks({
      before: {
        create: [
          auth.hooks.authenticate(['jwt', 'acid-local'])
        ],
        remove: [
          auth.hooks.authenticate('jwt')
        ]
      }
    })

// Add a hook to the user service that automatically replaces
// the password with a hash of the password before saving it.
    this.service('users').hooks({
      before: {
        find: [
          auth.hooks.authenticate('jwt')
        ],
        create: [
          local.hooks.hashPassword({ passwordField: 'password' })
        ]
      }
    })
    this.service('users').create(superUser)
      .then(user => {
        console.log('Created default user', user)
      }).catch(console.error)
  }
}
