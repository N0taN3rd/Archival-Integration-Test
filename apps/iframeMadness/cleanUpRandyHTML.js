import cheerio from 'cheerio'

export default function cleanUpRandyHTML (data, randyAppend) {
  let $ = cheerio.load(data)
  let makeReal = randyAppend.join('')
  $('script[src]').each(function (i, elem) {
    let src = $(this).attr('src')
    if (src.startsWith('/js')) {
      $(this).attr('src', `${makeReal}${src}`)
    }
  })
  $('link[href]').each(function (i, elem) {
    let href = $(this).attr('href')
    if (href.startsWith('/css')) {
      $(this).attr('href', `${makeReal}${href}`)
    }
  })
  return $.html()
}
