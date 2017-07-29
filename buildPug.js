const fs = require('fs-extra')
const pug = require('pug')

let fn = pug.compileFile('pug/acidV1/index.pug',{pretty: true})

fs.writeFile('acidv1.html', fn({}))
  .then(() => {
    console.log(' ')
  })

