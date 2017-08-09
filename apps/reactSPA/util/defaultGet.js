export default function defaultGet (data, key) {
  try {
    return data.get(key)
  } catch (error) {
    console.error(error)
    return null
  }
}
