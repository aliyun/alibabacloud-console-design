import { random } from 'lodash'

export default (type) => new Promise((resolve, reject) => {
  const delay = random(0, 5)
  console.warn(`Starting a mock service that will throw an new error in ${delay} seconds`)
  setTimeout(() => {
    const err = new Error('RiskError')
    err.IS_RISK_ERR = true
    err.type = type
    err.mteeCode = '123*****798'
    err.codeType = 'aliyun_console'
    err.detail = '123*****798'

    reject(err)
  }, delay * 1000)
})