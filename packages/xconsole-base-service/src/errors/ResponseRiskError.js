import ResponseDataCodeError from './ResponseDataCodeError'

const ERR_MSG = 'Two-factor authentication'

class ResponseRiskError extends ResponseDataCodeError {
  constructor(response, message = ERR_MSG) {
    super(response, message)
  }
}

export default ResponseRiskError
