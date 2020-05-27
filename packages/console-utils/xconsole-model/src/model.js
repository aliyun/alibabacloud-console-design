import { v1 as uuid } from 'uuid'
import { takeLatest } from '@alicloud/xconsole-effect-creator'
import _ from 'lodash'

const defaultModel = {
  state: {
    Result: {},
    APIError: {},
  },
  reducers: {
    save(state, action) {
      const { payload = {} } = action
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {},
  subscriptions: {},
  selectors: {
    result: state => state && state.Result,
    error: state => state && state.APIError,
  },
}

export default ({ service, initialValue, namespace = uuid(), ...rest }) => {
  if (_.isFunction(service)) {
    const dvaModel = {
      ...defaultModel,
      namespace,
      effects: {
        action: takeLatest(function* ({ payload, meta = {} }, { call, put }) {
          try {
            yield put({
              type: 'save',
              payload: { APIError: null },
            })
            const result = yield call(service, payload)
            yield put({
              type: 'save',
              payload: {
                Result: result,
              },
            })
            if (meta.onCompleted) {
              _.delay(() => {
                meta.onCompleted(result)
              }, 200)
            }
          } catch (error) {
            console.log('debugme try catch', error);
            yield put({
              type: 'save',
              payload: { APIError: error },
            })
            if (meta.onError) {
              _.delay(() => {
                meta.onError(error)
              }, 200)
            }

            throw error;
          }
        }),
      }
    }
    if (initialValue) {
      dvaModel.state.Result = initialValue
    }
    return dvaModel
  } else {
    return {
      namespace,
      ...rest
    }
  }
}
