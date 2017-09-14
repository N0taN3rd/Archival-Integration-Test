import addTrailer from '../util/addTrailer'

window.__ROUTE_INFO__ = addTrailer(window.__ROUTE_INFO__, window.__ROUTE_INFO__.trailer)

console.log(window.__ROUTE_INFO__)

export const navInfo = window.__ROUTE_INFO__.navInfo

export default window.__ROUTE_INFO__.sections
