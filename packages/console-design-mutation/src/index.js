/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash.isfunction'
import { connect } from 'dva'
import { ModelContext } from '@alicloud/console-design-model'

const ConsoleMutation = ({
  mutation,
  variables,
  children,
  refetchQuery,
  onCompleted,
  onError,
  dispatch,
  state,
}) => {
  const { attach, detach } = React.useContext(ModelContext)
  const [model] = useState(() => attach(mutation))

  const [queryModel] = useState(() => {
    if (isFunction(refetchQuery)) {
      const { query } = refetchQuery({})
      return attach(query)
    }
    return null
  })

  const [savedVariables, setSavedVariables] = useState(variables)

  useEffect(() => {
    return () => {
      detach(mutation.namespace)
      if (queryModel) {
        detach(queryModel.namespace)
      }
    }
  }, [])

  const _onCompleted = (result) => {
    if (isFunction(refetchQuery) && queryModel) {
      const refetch = refetchQuery(result)
      dispatch(queryModel.action(refetch.variables))
    }
    if (isFunction(onCompleted)) {
      onCompleted(result)
    }
  }

  const mutate = (realVariables) => {
    const params = realVariables || savedVariables
    dispatch(model.action(params, {
      onCompleted: _onCompleted,
      onError: isFunction(onError) ? onError : null,
    }))
    setSavedVariables(params)
  }

  const data = model.selectors.result(state)
  const error = model.selectors.error(state)
  const loading = model.action.isLoading(state)

  if (!isFunction(children)) {
    return children
  }

  return children(mutate, {
    data,
    loading,
    error,
  })
}

ConsoleMutation.propTypes = {
  mutation: PropTypes.objectOf(PropTypes.any),
  variables: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.func,
  refetchQuery: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
}

ConsoleMutation.displayName = 'ConsoleMutation'

export default connect(state => ({ state }))(ConsoleMutation)
