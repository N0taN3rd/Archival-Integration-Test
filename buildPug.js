const fs = require('fs-extra')
const rp = require('request-promise')
const ims = fs.readJsonSync('ims.json')
var options = {
  method: 'POST',
  uri: 'http://localhost:8091/images',
  body: ims.photos.photo,
  json: true // Automatically stringifies the body to JSON
}
rp(options).then((res) => {
  console.log(res)
}).catch(error => {
 console.error(error)
})

// const pug = require('pug')
//
// const cwd = process.cwd()
//
// const compileME = [
//   {from: 'pug/acidV1/acidIframe.pug', to: 'public/acidv1/viaIframe/index.html'}
// ]
//
// // let fn = pug.compileFile('pug/acidV1/index.pug', {pretty: true})
//
// async function doIt () {
//   let i = 0
//   let len = compileME.length
//   let pugString
//   let toCompile
//   for (; i < len; ++i) {
//     toCompile = compileME[i]
//     await fs.writeFile(toCompile.to, pug.renderFile(toCompile.from, {pretty: true}), 'utf8')
//   }
// }
//
// doIt()
//   .then(() => {
//     console.log('done')
//   })
//   .catch(error => {
//     console.error(error)
//   })

