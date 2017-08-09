export default function getDataImmutableOrNative (what) {
  let data
  try {
    data = what.toJS()
  } catch (error) {
    console.error(error)
    data = what
  }
  return data
}
