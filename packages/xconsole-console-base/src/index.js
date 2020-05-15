/*
 * ConsoleBase
 * 负责与 ConsoleBase 进行通信的内核模块
 * 包括但不限于 regionbar resourceGroup toolbox
 */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'dva/router'
import {
  subscribeRegionbarDidMount,
  subscribeConsoleRegionChange,
  sendRegionList,
} from './messenger'

const XconsoleConsoleBase = ({
  history,
  match,
  regionList,
}) => {
  React.useEffect(() => {
    // subscribe regionbar mount event
    const unsubscribeMount = subscribeRegionbarDidMount(() => {
      sendRegionList(regionList)
    })
    // subscribe regionbar change event
    const unsubscribeChange = subscribeConsoleRegionChange((payload) => {
      const { fromRegionId, toRegionId } = payload
      fromRegionId && toRegionId && history.push(
        window.location.pathname.replace(fromRegionId, toRegionId)
      );
    })
    sendRegionList(regionList)
    return () => {
      unsubscribeMount()
      unsubscribeChange()
    }
  }, [regionList, history])

  // To tell topbar to rerender the region list for every route change
  React.useEffect(() => {
    sendRegionList(regionList)
  }, [match, regionList])

  return null
}

XconsoleConsoleBase.propTypes = {
  children: PropTypes.node,
  match: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  regionList: PropTypes.arrayOf(PropTypes.any),
}

export default withRouter(XconsoleConsoleBase)
