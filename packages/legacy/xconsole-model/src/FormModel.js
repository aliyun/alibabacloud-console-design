/* eslint react/prop-types: 0 */

import React from 'react'
import { takeLatest } from '@alicloud/xconsole-effect-creator'
import PropTypes from 'prop-types'
import Model from './Provider'

const defaultModel = {
  state: {
    Data: {},
    Result: null,
    APIError: null,
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
    data: state => state.Data,
    error: state => state.APIError,
    result: state => state.Result,
  },
}

const FormModel = (props) => {
  const effects = {
    fetch: takeLatest(function* ({ payload, meta = {} }, { call, put }) {
      try {
        const result = yield call(props.fetch, payload)
        yield put({
          type: 'save',
          payload: result,
        })
        if (meta.onCompelted) {
          meta.onCompeleted(result)
        }
      } catch (error) {
        yield put({
          type: 'save',
          payload: { APIError: error },
        })
        if (meta.onError) {
          meta.onError(error)
        }
      }
    }),
    submit: takeLatest(function* ({ payload, meta = {} }, { call, put }) {
      try {
        const result = yield call(props.submit, payload)
        yield put({
          type: 'save',
          payload: { Result: result },
        })
        if (meta.onCompleted) {
          meta.onCompleted(result)
        }
      } catch (error) {
        yield put({
          type: 'save',
          payload: { APIError: error },
        })
        if (meta.onError) {
          meta.onError(error)
        }
      }
    }),
  }

  const model = {
    ...defaultModel,
    effects,
  }

  return (
    <Model model={model}>
      {props.children}
    </Model>
  )
}

FormModel.propTypes = {
  fetch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

FormModel.extend = extra => props => (
  <Model model={{ ...defaultModel, ...extra }}>
    {props.children}
  </Model>
)

export default FormModel
