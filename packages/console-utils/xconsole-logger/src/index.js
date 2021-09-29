import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Logger from './logger'

const XConsoleLogger = ({
  config = {},
  routeConfig = {},
  history,
}) => {
  const logger = new Logger({
    spma: config.spma,
    global: routeConfig.global,
    routeConfigs: routeConfig.routes,
  })

  useEffect(() => {
    if (!history) return false
    const unlisten = history.listen(({ pathname }) => {
      logger.log(pathname)
    })
    return () => {
      if (unlisten) {
        unlisten()
      }
    }
  }, [logger, history]);


  // log initial path
  useEffect(() => {
    history && logger.log(history?.location?.pathname);
  }, [])

  return null
}

XConsoleLogger.displayName = 'XConsoleLogger'

XConsoleLogger.propTypes = {
  config: PropTypes.objectOf(PropTypes.any),
  routeConfig: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
}

export default React.memo(XConsoleLogger)
