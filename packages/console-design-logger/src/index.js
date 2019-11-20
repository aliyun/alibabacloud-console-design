import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Logger from './logger'

const ConsoleLogger = ({
  config = {},
  routeConfig = {},
  history,
}) => {
  const logger = new Logger({
    spma: config.spma,
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
  }, [logger, history])

  return null
}

ConsoleLogger.displayName = 'ConsoleLogger'

ConsoleLogger.propTypes = {
  config: PropTypes.objectOf(PropTypes.any),
  routeConfig: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
}

export default React.memo(ConsoleLogger)
