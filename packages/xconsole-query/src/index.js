/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { ModelContext } from '@alicloud/xconsole-model'
import isFunction from 'lodash.isfunction'
import useCompare from './useCompare'


const XConsoleQuery = ({
  query,
  variables,
  children,
  onCompleted,
  onError,
  dispatch,
  state,
}) => {
  // 从 Context 中获取 model 方法
  const { attach, detach } = React.useContext(ModelContext)
  // 注册 model
  const [model] = useState(() => attach(query))
  // 保存 variables
  const [savedVariables, setSavedVariables] = useState(variables)

  const data = model.selectors.result(state) || {}
  const loading = model.action.isLoading(state) || false
  const error = model.selectors.error(state)

  const loadData = (vars) => {
    // fix 修复当出现大量渲染的时候，对在发生的请求不做重新请求调用
    if (loading !== true) {
      dispatch(model.action(vars, {
        onCompleted: isFunction(onCompleted) ? onCompleted : null,
        onError: isFunction(onError) ? onError : null,
      }))
    }
  }

  // refetch
  const refetch = (nextVariables = {}) => {
    // 合并新旧参数
    const mergedVariables = {
      ...savedVariables,
      ...nextVariables,
    }
    loadData(mergedVariables)
    setSavedVariables(mergedVariables)
  }


  // 通过 model 请求数据
  useEffect(() => {
    loadData(variables)
    setSavedVariables(variables)
  }, [useCompare(variables)])

  // 组件卸载时注销 model
  useEffect(() => {
    return () => {
      detach(query.namespace)
    }
  }, [])


  if (!isFunction(children)) {
    console.warn('[XConsole Query] children is not a function') // eslint-disable-line no-console
    return children
  }

  return children({
    data,
    loading,
    error,
    variables: savedVariables,
    refetch,
  })
}

XConsoleQuery.propTypes = {
  query: PropTypes.objectOf(PropTypes.any),
  variables: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
}

XConsoleQuery.displayName = 'XConsoleQuery'

export default connect(state => ({ state }))(XConsoleQuery)
