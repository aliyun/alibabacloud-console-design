/*
 * ConsoleBase
 * 负责与 ConsoleBase 进行通信的内核模块
 * 包括但不限于 regionbar resourceGroup toolbox
 */
import React from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import { withRouter, matchPath } from 'dva/router';
import { sendRegionList } from './messenger';

import { handleLegacyRegion } from './legacy';

const handleConsoleBase = (
  forApp: any, history: any, regionList: any, 
  currentRegionId: any, reginbarVisiblePaths: any, location: any
) => {
  // update the history when region change on the reigonbar
  const unsubscribeRegionChange = forApp.onRegionChange((payload: any) => {
    // 如果有路由 & 并且路由里面带着 regionId
    payload.id && history.push(
      window.location.pathname.replace(currentRegionId, payload.id)
    );
  });

  forApp.toggleRegion(false);

  (reginbarVisiblePaths || []).forEach((showRegionPath: string) => {
    const matches = matchPath(location.pathname, {
      path: showRegionPath,
      exact: true,
      strict: true,
    });
    if (matches) {
      forApp.setRegions(regionList);
      forApp.toggleRegion(true);
    }
  });

  return () => {
    unsubscribeRegionChange();
  }
}

const XconsoleConsoleBase = ({
  history,
  match,
  location,
  regionList,
  enableConsoleBaseNew,
  forApp,
  activeRegionId,
  reginbarVisiblePaths
}: any) => {
  React.useEffect(() => {
    // handle consolebase
    if (enableConsoleBaseNew && forApp) {
      return handleConsoleBase(forApp, history, regionList, activeRegionId, reginbarVisiblePaths, location)
    }

    return handleLegacyRegion(regionList, history);
  }, [regionList, history, activeRegionId, reginbarVisiblePaths, location.pathname])

  // To tell topbar to rerender the region list for every route change
  React.useEffect(() => {
    if (!enableConsoleBaseNew || !forApp) {
      return;
    }
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
