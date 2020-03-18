/* eslint-disable max-depth */
import {
  ResponseRiskError,
  ResponseDataCodeError,
} from '@alicloud/xconsole-base-service/lib/errors'
import { effects } from 'dva/saga'
import intl from '@alicloud/console-components-intl'
import isPlainObject from 'lodash/isPlainObject'
import * as constants from './model/constants'
import * as selectors from './model/selectors'
import actions from './model/actions'
import actionTypes from './model/actionTypes'

const { ResponseField } = constants

const getType = obj => Object.prototype.toString.call(obj)

const checkActionPayload = (payload) => {
  const actionName = '@@wind-rc-risk-confirm/show'

  if (!isPlainObject(payload)) {
    throw new TypeError(`[${actionName}] Expect payload to be a plain object but got a ${getType(payload)}.`)
  }

  const requiredFields = [
    'type',
    'codeType',
    'mteeCode',
  ]

  requiredFields.forEach((field) => {
    if (typeof payload[field] === 'undefined') {
      throw new ReferenceError(`[${actionName}] The field '${field}' is required in payload.`)
    }
  })
}

const defaultOptions = {
  mergeArgs(originArgs, riskParams) {
    const [params, config = {}, ...restArgs] = originArgs
    return [
      params,
      {
        ...config,
        data: riskParams,
      },
      ...restArgs,
    ]
  },
  isVerifyCodeError(err) {
    return (
      err instanceof ResponseDataCodeError &&
      err.code === 'verifyCodeInvalid'
    )
  },
  isRiskError(err) {
    return (
      err instanceof ResponseRiskError
    )
  },
  mapRiskErrorToActionPayload(err) {
    const {
      response: {
        data: {
          data: {
            [ResponseField.TYPE]: type,
            [ResponseField.DETAIL]: detail,
            [ResponseField.CODE_TYPE]: codeType,
            [ResponseField.MTEE_CODE]: mteeCode,
          } = {},
        } = {},
      } = {},
    } = err

    return {
      type,
      detail,
      codeType,
      mteeCode,
    }
  },
}

const capture = (fn, options = {}) => function* (...args) {
  const opts = {
    ...defaultOptions,
    ...options,
  }

  try {
    return yield fn(...args)
  } catch (err) {
    yield effects.put.resolve(actions.endSubmitLoading())

    if (opts.isVerifyCodeError(err)) {
      yield effects.put.resolve(actions.setVerifyCodeError({
        message: err.responseMessage
        || err.message
        || intl('global.exception.capture.send.verify.code.text'),
      }))
      return err
    } else if (opts.isRiskError(err)) {
      const actionPayload = opts.mapRiskErrorToActionPayload(err)
      checkActionPayload(actionPayload)

      yield effects.put.resolve(actions.show(actionPayload))

      while (true) {
        const takenActions = yield effects.take([
          actionTypes.hide,
          actionTypes.submit,
        ])

        if (takenActions.type === actionTypes.hide) {
          yield effects.put.resolve(actions.reset())
          throw err
        }

        if (takenActions.type === actionTypes.submit) {
          yield effects.put.resolve(actions.startSubmitLoading())
          const {
            payload: {
              verifyCode,
            } = {},
          } = takenActions
          const {
            requestId,
            type: verifyType,
          } = yield effects.select(selectors.getState)
          const riskArgs = opts.mergeArgs(args, {
            verifyCode,
            verifyType,
            requestId,
          })
          const result = yield capture(fn, opts)(...riskArgs)
          if (!(result instanceof Error)) {
            yield effects.put.resolve(actions.endSubmitLoading())
            yield effects.put.resolve(actions.reset())
            return result
          }
        }
      }
    } else {
      yield effects.put.resolve(actions.reset())
      throw err
    }
  }
}

export default capture
