export default function addTrailer (pconf, trailer) {
  let v
  let kk
  if (Array.isArray(trailer)) {
    let len = trailer.length
    let i = 0
    let k
    for (; i < len; ++i) {
      k = trailer[ i ]
      v = pconf[ k ]
      for (kk in v) {
        if (v.hasOwnProperty(kk)) {
          if (!kk.endsWith('/')) {
            v[ `${kk}/` ] = v[ kk ]
          }
        }
      }
      pconf[ k ] = v
    }

  } else {
    v = pconf[ trailer ]
    for (kk in v) {
      if (v.hasOwnProperty(kk)) {
        if (!kk.endsWith('/')) {
          v[ `${kk}/` ] = v[ kk ]
        }
      }
    }
    pconf[ trailer ] = v
  }

  return pconf
}