const fs = require('fs-extra')

const moveMe = [
  {from: 'node_modules/normalize.css/normalize.css', to: 'public/css/normalize.css'},
  {from: 'node_modules/@blueprintjs/core/dist/blueprint.css', to: 'public/css/blueprint.css'},
  {from: 'node_modules/@blueprintjs/docs/dist/docs.css', to: 'public/css/blueprint-docs.css'},
  {from: 'node_modules/js-cookie/src/js.cookie.js', to: 'public/js/js.cookie.js'},
]

async function doIt () {
  let len = moveMe.length
  let i = 0
  let cur
  for (; i < len; ++i) {
    cur = moveMe[i]
    await fs.copy(cur.from, cur.to)
  }

}

doIt().then(() => {
  console.log('fin')
}).catch(error => {
  console.error(error)
})