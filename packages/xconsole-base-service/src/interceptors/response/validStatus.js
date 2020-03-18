import ResponseStatusError from '../../errors/ResponseStatusError'

export default (response) => {
  const { status } = response
  if (status >= 200 && status < 300) {
    return response
  }
  throw new ResponseStatusError(response)
}
