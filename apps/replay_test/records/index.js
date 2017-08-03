import { Record } from 'immutable'

class FetchResponse extends Record({
  type: 'basic',
  url: '',
  status: 200,
  ok: true,
  statusText: '',
  headers: null
}) {
  update (res) {
    return this.merge(res)
  }
}

export class FetchRecord extends Record({
  isFetching: false,
  haveResult: false,
  done: false,
  result: null,
  res: new FetchResponse(),
  wasError: false,
  err: null,
  url: ''
}) {
  fetchStarted (url) {
    return this.merge({isFetching: true, done: false, wasError: false, url, haveResult: false})
  }

  fetchError (err) {
    return this.merge({isFetching: false, done: true, wasError: true, err})
  }

  fetchDone (res, body) {
    return this.withMutations(me => {
      me.set('res', me.res.update(res)).merge({
        isFetching: false,
        done: true,
        wasError: true,
        result: body,
        haveResult: true
      })
    })
  }
}
