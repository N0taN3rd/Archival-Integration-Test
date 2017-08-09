import { combineReducers } from 'redux-immutable'
import { Map } from 'immutable'
import { handleAction } from 'redux-actions'

const wikiReducer = handleAction('FETCH_WIKI_LE',
  (state, action) => state.merge(action.payload),
  Map({done: false})
)

const lmgtfyReducer = handleAction('FETCH_LMGTFY',
  (state, action) => state.merge(action.payload),
  Map({done: false})
)

const chuckJokeReducer = handleAction('FETCH_CHUCK',
  (state, action) => state.merge(action.payload),
  Map({done: false})
)

export default combineReducers({
  wiki: wikiReducer,
  lmgtfy: lmgtfyReducer,
  chuck: chuckJokeReducer
})
