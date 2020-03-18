import warning from '@ali/wind-dev-utils/lib/warning'
import withData from './withData'

const defaultDataKey = 'umid'
const defaultGetter = () => {
  let result
  try {
    result = window.RISK_INFO.UMID
    if (typeof result === 'undefined') {
      throw new ReferenceError('Cannot get valid `UMID` from window.RISK_INFO')
    }
  } catch (err) {
    warning(false, `${err.message}\n${err.stack}`)
  }

  return result
}

export default ({
  dataKey = defaultDataKey,
  getter = defaultGetter,
} = {}) => withData(dataKey, getter)
