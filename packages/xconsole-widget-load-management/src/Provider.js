import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import loader from './loader'


const Provider = ({
  children,
}) => {
  const [widgetPool, setWidgetPool] = useState({})
  const loadWidget = ({
    id,
    version,
    loadOptions,
  }) => {
    let TargetWidget = widgetPool[id]
    if (!TargetWidget) {
      const widget = loader({ id, version }, loadOptions)
      setWidgetPool({
        ...widgetPool,
        [id]: widget,
      })
      TargetWidget = widget
    }
    return TargetWidget
  }

  return (
    <Context.Provider value={loadWidget}>
      {children}
    </Context.Provider>
  )
}

Provider.displayName = 'WidgetLoadManagement'

Provider.propTypes = {
  children: PropTypes.node,
}

export default Provider
