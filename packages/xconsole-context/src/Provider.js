import React from 'react'
import Context from './Context'
import PropTypes from 'prop-types'
import { ConsoleBaseProvider } from '@alicloud/xconsole-console-base-context'
import { RegionProvider } from '@alicloud/xconsole-region-context'
import { ModelProvider } from '@alicloud/xconsole-model'
import { WidgetLoadManagementProvider } from '@alicloud/xconsole-widget-load-management'


const Provider = ({
  app,
  history,
  widgetLoader,
  uis,
  children,
}) => {
  const value = {
    app,
    history,
    uis
  }

  return (
    <Context.Provider value={value}>
      <ConsoleBaseProvider>
        <RegionProvider history={history}>
          <ModelProvider app={app}>
            <WidgetLoadManagementProvider loader={widgetLoader}>
              {children}
            </WidgetLoadManagementProvider>
          </ModelProvider>
        </RegionProvider>
      </ConsoleBaseProvider>
    </Context.Provider>
  )
}

Provider.displayName = 'WindProProvider'

Provider.propTypes = {
  app: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node,
}

export default Provider
