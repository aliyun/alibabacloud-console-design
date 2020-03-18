import warning from '@ali/wind-dev-utils/lib/warning'
import withData from './withData'

const defaultDataKey = 'collina'
const defaultGetter = () => {
  const glob = window || global
  try {
    const result = glob.RISK_INFO.GETUA()
    if (typeof result === 'undefined') {
      throw new ReferenceError(
        'Cannot get valid result of collina from window.RISK_INFO.GETUA()'
      )
    }
    return result
  } catch (err) {
    warning(false, `${err.message}\n${err.stack}`)
  }
}

export default ({
  dataKey = defaultDataKey,
  getter = defaultGetter,
} = {}) => withData(dataKey, getter)
