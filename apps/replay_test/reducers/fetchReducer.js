import constants from '../constants'
import Immutable from 'immutable'
import { FetchRecord } from '../records'

const {FetchGet, FetchLocalImage} = constants

export const fetchGitApi = (state = Immutable.Map({done: false, wasError: false, res: null, body: null, err: null}), action) => {
  switch (action.type) {
    case FetchGet.FETCH_GET_DONE:
      const {res, body} = action
      return state.merge({done: true, wasError: false, res, body})
    case FetchGet.FETCH_GET_ERROR:
      const {err} = action
      return state.merge({done: true, wasError: true, err})
    default:
      return state
  }
}

export const fetchLocalIm = (state = Immutable.Map({done: false, wasError: false, body: null, err: null}), action) => {
  switch (action.type) {
    case FetchLocalImage.FETCH_LOCAL_IMAGE_DONE:
      const {blob} = action
      return state.merge({done: true, wasError: false, body: blob})
    case FetchLocalImage.FETCH_LOCAL_IMAGE_ERROR:
      const {err} = action
      return state.merge({done: true, wasError: true, err})
    default:
      return state
  }
}
