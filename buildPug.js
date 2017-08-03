const fs = require('fs-extra')
const rp = require('request-promise')
const ims = fs.readJsonSync('ims.json')

const apiKey = '3e75fa0fe8a8ea56a70bfb66a53e9220'
const meth = 'GET'
const url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&user_id=32951986%40N05&extras=url_q&format=json&nojsoncallback=1&api_key=`

const it = {apiKey, meth, url}
fs.writeJSONSync('flick.json', it)

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
