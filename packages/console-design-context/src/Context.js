import React, { createContext } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import reduce from 'lodash.reduce'

import { ModelProvider } from '@alicloud/console-design-model'
import { getActiveId } from '@alicloud/console-components-region'

import { MAPPING } from './cons'

const Context = createContext()

export default Context

const _Provider = ({
  app,
  history,
  config = {},
  activeId,
  children,
}) => {
  const consoleConfig = reduce(MAPPING, (result, v, k) => ({
    ...result,
    [k]: get(config, v),
  }), {})

  const value = {
    app,
    history,
    activeRegionId,
    consoleConfig,
  }

  return (
    <Context.Provider value={value}>
      <ModelProvider app={app}>
        {children}
      </ModelProvider>
    </Context.Provider>
  )
}

_Provider.displayName = 'ConsoleProvider'

_Provider.propTypes = {
  app: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node,
}

export const Provider = connect(state => ({
  activeId: getActiveId(state)
}), null)(_Provider)
