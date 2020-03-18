import format from 'format'
import ResponseError from './ResponseError'

const ERR_MSG = 'Invalid response status code: %d'

class ResponseStatusError extends ResponseError {
  constructor(response, message = ERR_MSG) {
    const { status } = response
    super(response, format(message, status))
    this.status = status
  }
}

export default ResponseStatusError
