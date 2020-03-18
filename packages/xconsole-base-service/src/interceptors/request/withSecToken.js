import warning from '@ali/wind-dev-utils/lib/warning'
import withData from './withData'

const defaultDataKey = 'sec_token'
const defaultGetter = () => {
  const glob = window || global
  let result
  try {
    result = glob.ALIYUN_CONSOLE_CONFIG.SEC_TOKEN
    if (typeof result === 'undefined') {
      throw new ReferenceError(
        'Cannot get valid `SEC_TOKEN` from window.ALIYUN_CONSOLE_CONFIG'
      )
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
