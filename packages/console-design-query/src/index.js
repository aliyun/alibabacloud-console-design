/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { ModelContext } from '@alicloud/console-design-model'
import isFunction from 'lodash.isfunction'
import useCompare from './useCompare'

const ConsoleQuery = ({
  query,
  variables,
  children,
  onCompleted,
  onError,
  dispatch,
  state,
}) => {
  const { attach, detach } = React.useContext(ModelContext)
  const [model] = useState(() => attach(query))
  const [savedVariables, setSavedVariables] = useState(variables)

  const loadData = (vars) => {
    dispatch(model.action(vars, {
      onCompleted: isFunction(onCompleted) ? onCompleted : null,
      onError: isFunction(onError) ? onError : null,
    }))
  }

  useEffect(() => {
    loadData(variables)
    setSavedVariables(variables)
  }, [useCompare(variables)])

  useEffect(() => {
    return () => {
      detach(query.namespace)
    }
  }, [])

  const refetch = (nextVariables = {}) => {
    const mergedVariables = {
      ...savedVariables,
      ...nextVariables,
    }
    loadData(mergedVariables)
    setSavedVariables(mergedVariables)
  }

  const data = model.selectors.result(state) || {}
  const loading = model.action.isLoading(state) || false
  const error = model.selectors.error(state)

  if (!isFunction(children)) {
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

ConsoleQuery.propTypes = {
  query: PropTypes.objectOf(PropTypes.any),
  variables: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
}

XConsoleQuery.displayName = 'ConsoleQuery'

export default connect(state => ({ state }))(ConsoleQuery)
