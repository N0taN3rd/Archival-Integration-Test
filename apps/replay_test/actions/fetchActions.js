import constants from '../constants'

export const doFetchGet = url => {
  console.log('doing fetch get')
  return {
    type: constants.FetchGet.DO_FETCH_GET,
    url
  }
}

export const doLocalImFetchGet = url => ({
  type: constants.FetchLocalImage.DO_FETCH_LOCAL_IMAGE,
  url
})
