import { capture } from '@ali/wind-rc-risk'
import service from './service'

const capturedService = capture(service, {
  isRiskError(err) {
    return err.IS_RISK_ERR
  },
  mapRiskErrorToActionPayload(err) {
    const { type, codeType, mteeCode, detail } = err
    return {
      type,
      codeType,
      mteeCode,
      detail,
    }
  }
})

export default {
  namespace: 'test-wind-risk',
  state: null,
  reducer: {},
  effects: {
    execute: function* ({ payload }, { call }) {
      const { type } = payload
      yield call(capturedService, type)
    },
  }
}
