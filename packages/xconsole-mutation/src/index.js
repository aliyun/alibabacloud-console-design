/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { ModelContext } from '@alicloud/xconsole-model'
import isFunction from 'lodash.isfunction'
import debug from './_debug'

const { isArray } = Array;

const XConsoleMutation = ({
  mutation,
  variables,
  children,
  refetchQuery,
  onCompleted,
  onError,
  dispatch,
  state,
}) => {
  // 从 Context 中获取 model 方法
  const { attach, detach } = React.useContext(ModelContext)
  // 注册 Mutation model
  const [model] = useState(() => attach(mutation))

  // 注册 refetch Query model
  const [queryModels] = useState(() => {
    if (!refetchQuery) {
      return [];
    }

    let queries = [refetchQuery];

    if (isFunction(refetchQuery)) {
      debug('refetchQuery 是函数');
      queries = refetchQuery({});
      if (!isArray(queries)) {
        debug('refetchQuery 执行结果不是数组');
        queries = [queries]
      }
    }

    if (isArray(refetchQuery)) {
      debug('refetchQuery 是数组');
      queries = refetchQuery;
    }

    const models = queries.map((item) => {
      if (!item) {
        return null;
      }
      const { query } = item;

      if (!query) {
        debug('数组中有元素未设置 query 字段');
        console.warn('[XConsole Mutation] query is not set in refetchQuery');// eslint-disable-line no-console
        return null;
      }

      const _model = attach(query);
      _model.__variables = item.variables || {};
      return _model;
    })
    return models
  })
  // 保存 variables
  const [savedVariables, setSavedVariables] = useState(variables)

  // 组件卸载时注销 model
  useEffect(() => {
    return () => {
      detach(mutation.namespace)
      if (queryModels) {
        debug(`Mutation ${mutation.namespace} 卸载，需注销 models`);
        queryModels.forEach(queryModel => {
          if (queryModel !== null) {
            detach(queryModel.namespace)
          }
        })
      }
    }
  }, [])

  const _onCompleted = (result) => {
    debug(`Mutation ${mutation.namespace} 请求完成`);
    if (queryModels) {
      debug(`Mutation ${mutation.namespace} 请求完成, 执行 refetchQuery 动作`);
      queryModels.forEach(queryModel => {
        if (queryModel !== null) {
          dispatch(queryModel.action(queryModel.__variables))
        }
      })
    }
    if (isFunction(onCompleted)) {
      onCompleted(result)
    }
  }

  const mutate = (realVariables) => {
    if (realVariables) {
      dispatch(model.action(realVariables, {
        onCompleted: _onCompleted,
        onError: isFunction(onError) ? onError : null,
      }))
      setSavedVariables(realVariables)
    } else {
      dispatch(model.action(savedVariables, {
        onCompleted: isFunction(onCompleted) ? onCompleted : null,
        onError: isFunction(onError) ? onError : null,
      }))
    }
  }

  const data = model.selectors.result(state)
  const error = model.selectors.error(state)
  const loading = model.action.isLoading(state)

  if (!isFunction(children)) {
    console.warn('[XConsole Mutation] children is not a function') // eslint-disable-line no-console
    return children
  }

  return children(mutate, {
    data,
    loading,
    error,
  })
}

XConsoleMutation.propTypes = {
  mutation: PropTypes.objectOf(PropTypes.any),
  variables: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.func,
  refetchQuery: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
}

XConsoleMutation.displayName = 'XConsoleMutation'

export default connect(state => ({ state }))(XConsoleMutation)
