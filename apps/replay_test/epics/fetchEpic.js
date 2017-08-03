import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import Promise from 'bluebird'
import constants from '../constants'

const {FetchGet, FetchLocalImage} = constants

const doFetchGet = url => fetch(url).then(res => {
  const myRes = {...res}
  return res.json().then(body => ({res: myRes, body}))
})

const doFetchLocalImage = url => fetch(url).then(res => res.blob())

const fetchGetDone = ({res, body}) => ({
  type: FetchGet.FETCH_GET_DONE,
  res,
  body
})

const fetchGetError = err => ({
  type: FetchGet.FETCH_GET_ERROR,
  err
})

const fetchLocalImDone = (blob) => ({
  type: FetchLocalImage.FETCH_LOCAL_IMAGE_DONE,
  blob
})

const fetchLocalImError = err => ({
  type: FetchLocalImage.FETCH_LOCAL_IMAGE_ERROR,
  err
})

export const fetchGetEpic = action$ =>
  action$.ofType(FetchGet.DO_FETCH_GET)
    .mergeMap(action => {
      console.log('fetch get epic', action)
      return Observable.fromPromise(doFetchGet(action.url))
          .map(result => fetchGetDone(result))
          .catch(err => fetchGetError(err))
    }
    )

export const fetchLocalImage = action$ =>
  action$.ofType(FetchLocalImage.DO_FETCH_LOCAL_IMAGE)
    .mergeMap(action =>
      Observable.fromPromise(doFetchLocalImage(action.url))
        .map(result => fetchLocalImDone(result))
        .catch(err => fetchLocalImError(err))
    )
