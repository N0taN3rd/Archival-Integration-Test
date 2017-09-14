const fs = require('fs-extra')

const moveMe = [
  {from: 'node_modules/uikit/dist/css/uikit.min.css', to: 'public/css/uikit.min.css'},
  {from: 'node_modules/uikit/dist/css/uikit.min.css', to: 'public/frontAssets/uikit.min.css'},
  {from: 'node_modules/uikit/dist/css/uikit.min.css', to: 'public/frontAssets/uikit.min.css'}
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
