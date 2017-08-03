import { combineEpics } from 'redux-observable'
import { sendMessageEpic, startListeningEpic } from './swEpics'
import { fetchGetEpic, fetchLocalImage } from './fetchEpic'

const rootEpic = combineEpics(sendMessageEpic, startListeningEpic, fetchGetEpic, fetchLocalImage)

export default rootEpic
