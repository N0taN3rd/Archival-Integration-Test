module.exports = function (config) {
  const getArr = ['get']
  let map = {}
  let i
  let len
  let href
  for (let [k, v] of Object.entries(config.acidRoutes.sections)) {
    if (map[k] === undefined) {
      map[k] = getArr
    }
    len = v.length
    i = 0
    while (i < len) {
      href = v[i].href
      if (href[0] !== '/') {
        href = `/${href}`
      }
      if (map[href] === undefined) {
        map[href] = getArr
      }
      i++
    }
  }
  map['/sitemap.xml'] = getArr
  map['/robots.txt'] = getArr
  return {
    url: process.env.FRONT_END_DOMAIN,
    port: process.env.NODE_ENV === 'development' ? config.port : process.env.OUT_SIDE_DOCKER_PORT,
    map
  }
}
