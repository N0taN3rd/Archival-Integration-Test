import constants from '../constants'
import Promise from 'bluebird'

export const doFetchGet = url => {
  console.log('doing fetch get')
  return Promise.delay(3000).then(() => {
    console.log('done waiting')
    return {
      type: constants.FetchGet.DO_FETCH_GET,
      url
    }
  })
}

export const doLocalImFetchGet = url => Promise.delay(2000).then(() => ({
  type: constants.FetchLocalImage.DO_FETCH_LOCAL_IMAGE,
  url
}))
