import format from 'format'
import ResponseError from './ResponseError'

const ERR_MSG = 'Invalid response data\'s code: %s'

class ResponseDataCodeError extends ResponseError {
  constructor(response, message = ERR_MSG) {
    const {
      data: {
        code,
        data,
        message: responseMessage,
        requestId,
      } = {},
    } = response
    super(response, format(message, code))

    this.code = code
    this.data = data
    this.responseMessage = responseMessage
    this.requestId = requestId
  }
}

export default ResponseDataCodeError
