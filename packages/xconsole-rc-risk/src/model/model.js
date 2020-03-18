import { eventChannel, END } from 'dva/saga'
import get from 'lodash/get'
import warning from 'warning'
import intl from '@alicloud/console-components-intl'
import * as constants from './constants'
import * as services from './services'
import {
  getTimer, getSendCodeParams, getVerifyCodeError,
  getState,
} from './selectors'

const initialState = {
  visible: false,
  type: null,
  detail: null,
  codeType: null,
  mteeCode: null,
  isSubmitLoading: false,
  verifyCodeError: false,
}

const countdownChannel = timer => eventChannel((emitter) => {
  const task = setInterval(() => {
    timer -= 1 // eslint-disable-line no-param-reassign
    if (timer >= 0) {
      emitter(timer)
    } else {
      emitter(END)
    }
  }, 1000)

  return () => {
    clearInterval(task)
  }
})

export default {
  namespace: constants.NAMESPACE,
  state: {
    ...initialState,
    timer: 0,
    requestId: null,
  },
  reducers: {
    reset(state) {
      return {
        ...state,
        ...initialState,
      }
    },
    show(state, action) {
      const { payload } = action
      return {
        ...state,
        ...payload,
        visible: true,
      }
    },
    hide(state) {
      return {
        ...state,
        visible: false,
      }
    },
    setVerifyCodeError(state, action) {
      const {
        payload: {
          message,
        },
      } = action
      return {
        ...state,
        verifyCodeError: message,
      }
    },
    setTimer(state, action) {
      const {
        payload: {
          timer,
        },
      } = action
      return {
        ...state,
        timer,
      }
    },
    startSubmitLoading(state) {
      return {
        ...state,
        isSubmitLoading: true,
      }
    },
    endSubmitLoading(state) {
      return {
        ...state,
        isSubmitLoading: false,
      }
    },
    setRequestId(state, action) {
      const { payload } = action
      return {
        ...state,
        requestId: payload,
      }
    },
    clearRequestId(state) {
      return {
        ...state,
        requestId: undefined,
      }
    },
  },
  effects: {
    * countdown(action, effect) {
      const {
        payload: {
          timer = 60,
        } = {},
      } = action

      // 取出当前的计时器剩余时间
      const currentTimer = yield effect.select(getTimer)

      // 如果当前的计时器不为 0, 则表示还没有完成一个计数周期,
      // 阻止触发计数器避免任务线程间的干扰
      if (currentTimer > 0) {
        return
      }

      const setTimer = value => effect.put.resolve({
        type: 'setTimer',
        payload: { timer: value },
      })

      // 初始化计时器
      yield setTimer(timer)

      // 订阅倒计时
      const channel = yield effect.call(countdownChannel, timer)
      try {
        while (true) {
          // take(END) 将终止当前任务, 跳转到 finally
          const leftSeconds = yield effect.take(channel)
          // 将每一次成功的计数同步到计时器
          yield setTimer(leftSeconds)
        }
      } finally {
        // 计数任务完成后, 检查当前的计时器是否已经归零
        const finalCurrentTimer = yield effect.select(getTimer)
        if (finalCurrentTimer !== 0) {
          yield setTimer(0)
        }
      }
    },

    /**
     * 发送验证码
     * @param {Object} action
     * @param {Object} effect
     */
    * sendCode(action, effect) {
      const { payload = {}, meta = {} } = action
      try {
        // 首先重置 requestId, 防止信号污染
        yield effect.put.resolve({
          type: 'clearRequestId',
        })

        // 清理错误信息
        yield effect.put.resolve({
          type: 'setVerifyCodeError',
          payload: {
            message: false,
          },
        })

        const {
          sendVerifyCodeCaller,
          getSendVerifyCodeParams,
          getRequestIdFromResponse = originResponse => get(originResponse, 'data.requestId'), // eslint-disable-line max-len
        } = meta

        // 如果已经指定了如何获取请求句柄的方法, 则用该方法获取请求句柄
        const caller = typeof sendVerifyCodeCaller === 'function' ?
          sendVerifyCodeCaller : services.sendCode

        // 取出 state 中的相关数据并发送请求
        const paramsInState = yield effect.select(getSendCodeParams)
        const originParams = {
          ...paramsInState,
          ...payload,
        }
        // 如果已经指定了如何获取请求参数的方法, 则用该方法将原始的 params 进行处理
        let params = originParams
        if (typeof getSendVerifyCodeParams === 'function') {
          const currentState = yield effect.select(getState)
          params = getSendVerifyCodeParams(originParams, {
            // Use object spreading to make state to be read only,
            // or can be using `Object.freeze` ?
            ...currentState,
          })
        }

        const response = yield effect.call(caller, params)
        // 从响应数据中获取 requestId
        const requestId = getRequestIdFromResponse(response)

        warning(
          typeof requestId === 'string',
          `[@ali/wind-rc-risk] Expect 'requestId' to be a string, but get a ${Object.prototype.toString.call(requestId)}.`
        )

        // 存储 requestId
        if (requestId) {
          yield effect.put.resolve({
            type: 'setRequestId',
            payload: requestId,
          })
        }
      } catch (err) {
        // 如果任务失败则记录错误信息
        yield effect.put.resolve({
          type: 'setVerifyCodeError',
          payload: {
            message: (
              err.responseMessage ||
              err.message ||
              intl('global.exception.capture.send.verify.code.text')
            ),
          },
        })
      }
    },

    /**
     * 发送验证码并触发倒计时
     * @param {Object} action
     * @param {Object} effect
     */
    * sendCodeAndCountdown(action, effect) {
      const { payload, meta } = action
      yield effect.put.resolve({
        type: 'sendCode',
        payload,
        meta,
      })

      // 如果获取验证码的任务失败了, 会在 verifyCodeError 中记录失败的信息
      // 通过这个信息可以证明发送的任务是否正确执行.
      // 如果发送验证码的任务正常执行完毕没有错误抛出, 则执行倒计时的任务
      const verifyCodeError = yield effect.select(getVerifyCodeError)
      if (!verifyCodeError) {
        yield effect.put.resolve({
          type: 'countdown',
        })
      }
    },

    * submit() {
      // *******************************************************
      // *  !! Attention !!                                    *
      // *  DO NOT remove this funcion or you'll get be fired  *
      // *******************************************************

      // 这个函数里没有任何逻辑, 它存在的意义在于通过 `@ali/wind-action-creator` 为
      // 外界提供可用的 action creator, 以便可以通过 actions.submit()
      // 来触发这个 action. 具体的执行在 capture 函数中, 静静地等待这个 action 的到来...
    },
  },
}
