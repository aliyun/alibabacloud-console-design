import ExtendableError from './ExtendableError'

const ERR_MSG = 'Response error'

class ResponseError extends ExtendableError {
  constructor(response, message = ERR_MSG) {
    super(message)
    this.response = response
  }
}

export default ResponseError
