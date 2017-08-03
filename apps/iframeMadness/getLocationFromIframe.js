export default function getLocationFromIframe (id) {
  return document.getElementById(id).contentWindow.location
}
