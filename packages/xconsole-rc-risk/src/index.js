import { connect } from 'dva'
import model, { actions, selectors, constants } from './model'
import Risk from './views/Risk'
import capture from './capture'
import './index.less'

const mapStateToProps = state => ({
  visible: selectors.getVisible(state),
  type: selectors.getType(state),
  detail: selectors.getDetail(state),
  timer: selectors.getTimer(state),
  verifyCodeError: selectors.getVerifyCodeError(state),
  isSendCodeLoading: actions.sendCode.isLoading(state),
  isSubmitLoading: selectors.getSubmitLoading(state),
  isSubmitDisabled: selectors.getSubmitDisabled(state),
})

const mapDispatchToProps = (dispatch, ownerProps) => ({
  onSend() {
    const {
      sendVerifyCodeCaller,
      getSendVerifyCodeParams,
      getRequestIdFromResponse,
    } = ownerProps

    const action = actions.sendCodeAndCountdown({}, {
      sendVerifyCodeCaller,
      getSendVerifyCodeParams,
      getRequestIdFromResponse,
    })

    dispatch(action)
  },
  onClose() {
    dispatch(actions.hide())
  },
  onSubmit(code) {
    dispatch(actions.submit({
      verifyCode: code,
    }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Risk)

export {
  model,
  capture,
  actions,
  constants,
  selectors,
}
