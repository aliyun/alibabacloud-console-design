/* eslint react/prop-types: 0 */

import React from 'react'
import { takeLatest } from '@alicloud/xconsole-effect-creator'
import PropTypes from 'prop-types'
import Model from './Provider'
import _ from 'lodash'

const defaultModel = {
  state: {
    Data: [],
    TotalCount: 0,
    PageSize: 10,
    PageNumber: 1,
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
    result: state => state.Result,
    error: state => state.APIError,
    page: state => ({
      current: state.PageNumber,
      pageSize: state.PageSize,
      total: state.TotalCount,
    }),
  },
}

const ListModel = (props) => {
  const fetchEffect = {
    fetch: takeLatest(function* ({ payload, meta = {} }, { call, put }) {
      try {
        const result = yield call(props.fetch, payload)
        yield put({
          type: 'save',
          payload: {
            Data: result.Data,
            TotalCount: result.TotalCount,
            PageSize: result.PageSize,
            PageNumber: result.PageNumber,
          },
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
  }

  const effects = _.reduce(props, (result, value, key) => {
    if (key !== 'fetch' && _.isFunction(value)) {
      // eslint-disable-next-line no-param-reassign
      result[key] = function* ({ payload, meta = {} }, { call, put }) {
        try {
          const result = yield call(value, payload)
          yield put({
            type: 'save',
            payload: {
              Result: result,
            },
          })
          if (meta.onCompleted) {
            meta.onCompleted(result)
          }
        } catch (error) {
          yield put({
            type: 'save',
            payload: { APIError: e },
          })
          if (meta.onError) {
            meta.onError(error)
          }
        }
      }
    }
    return result
  }, fetchEffect)

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

ListModel.propTypes = {
  fetch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

ListModel.extend = extra => props => (
  <Model model={{ ...defaultModel, ...extra }}>
    {props.children}
  </Model>
)

export default ListModel
