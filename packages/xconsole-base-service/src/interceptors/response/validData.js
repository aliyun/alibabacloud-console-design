import {
  ResponseDataReferenceError,
  ResponseDataCodeError,
  ResponseRiskError,
} from '../../errors'

export default (response) => {
  const { data } = response
  if (!data) {
    throw new ResponseDataReferenceError(response)
  }

  const { code, message } = data

  if (code === 'FoundRiskAndDoubleConfirm') {
    throw new ResponseRiskError(response, message)
  }

  if (code !== '200' && code !== 200) {
    throw new ResponseDataCodeError(response, message)
  }

  return response
}
