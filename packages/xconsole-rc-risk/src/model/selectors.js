import { createSelector } from 'reselect' // eslint-disable-line
import * as cons from './constants'

export const getState = state => state[cons.NAMESPACE] //eslint-disable-line

export const getVisible = createSelector(
  getState,
  state => state.visible
)

export const getType = createSelector(
  getState,
  state => state.type
)

export const getDetail = createSelector(
  getState,
  state => state.detail
)

export const getCodeType = createSelector(
  getState,
  state => state.codeType
)

export const getMteeCode = createSelector(
  getState,
  state => state.mteeCode
)

export const getSendCodeParams = createSelector(
  getCodeType,
  getType,
  (codeType, verifyType) => ({
    codeType,
    verifyType,
  })
)

export const getTimer = createSelector(
  getState,
  state => state.timer
)

export const getVerifyCodeError = createSelector(
  getState,
  state => state.verifyCodeError
)

export const getSubmitLoading = createSelector(
  getState,
  state => state.isSubmitLoading
)

export const getSubmitDisabled = createSelector(
  getState,
  state => (state.type !== 'ga' && !state.requestId)
)
