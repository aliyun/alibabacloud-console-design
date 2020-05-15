import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import defaultLoader from './loader'


const Provider = ({
  loader,
  children,
}) => {
  console.log('loadwidget1', loader)
  const [widgetPool, setWidgetPool] = useState({})
  const [widgetLoader, setWidgetLoader] = useState(() => {
    return loader || defaultLoader;
  });

  console.log('loadwidget2', widgetLoader)
  const loadWidget = ({
    id,
    version,
    loadOptions,
  }) => {
    let TargetWidget = widgetPool[id]
    if (!TargetWidget) {
      const widget = widgetLoader({ id, version }, loadOptions)
      setWidgetPool({
        ...widgetPool,
        [id]: widget,
      })
      TargetWidget = widget
    }
    return TargetWidget
  }

  return (
    <Context.Provider value={{
      setWidgetLoader,
      loadWidget
    }}>
      {children}
    </Context.Provider>
  )
}

Provider.displayName = 'WidgetLoadManagement'

Provider.propTypes = {
  children: PropTypes.node,
}

export default Provider
