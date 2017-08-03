import keymirror from 'keymirror'

export default {
  Fetch: keymirror({
    DO_FETCH: null,
    FETCH_STARTED: null,
    FETCH_DONE: null,
    FETCH_ERROR: null
  }),
  FetchGet: keymirror({
    DO_FETCH_GET: null,
    FETCH_GET_STARTED: null,
    FETCH_GET_DONE: null,
    FETCH_GET_ERROR: null
  }),
  FetchLocalImage: keymirror({
    DO_FETCH_LOCAL_IMAGE: null,
    FETCH_LOCAL_IMAGE_STARTED: null,
    FETCH_LOCAL_IMAGE_DONE: null,
    FETCH_LOCAL_IMAGE_ERROR: null
  }),
  ServiceWorker: keymirror({
    GOT_NETWORK_MESSAGE: null,
    SEND_SW_MESSAGE: null,
    SEND_SW_DM: null,
    RECEIVED_SW_DM: null,
    RECEIVED_SW_MESSAGE: null,
    INSTALL_SW: null,
    INSTALL_SW_CANNOT: null,
    SW_INSTALL_FAILED: null,
    SW_INSTALL_COMPLETE: null,
    LISTEN_FOR_SWM: null,
    WAITING_TO_INSTALL_SW: null
  })
}
