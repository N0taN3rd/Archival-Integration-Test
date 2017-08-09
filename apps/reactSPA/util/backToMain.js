export function goHome () {
  window.location = process.env.ACID_HOME
}

export function goDynam () {
  window.location = `${process.env.ACID_HOME}/dynamic`
}
