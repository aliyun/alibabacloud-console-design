import { useEffect, useState, useContext } from 'react';
import { matchPath, generatePath } from 'react-router';

import ConsoleRegion from './index';
import ConsoleBase from '../console/ConsoleBase';
import { IConsoleContextProp } from '../types/index';
import { determineRegionId } from './determineRegionId';
import { RegionContext } from '../context/RegionContext';

type Region = typeof ConsoleRegion;

const hasRegionId = (match) => {
  return match.params && match.params.hasOwnProperty('regionId');
}

const reroute = (props: IConsoleContextProp<{regionId?: string}>, nextRegionId: string) => {
  const { history, match, location } = props;
  if (match && match.path && hasRegionId(match)) {
    const { path, params } = match;

    const nextPath = generatePath(path, {
      ...(params || {}),
      regionId: nextRegionId
    });
    const suff = location.pathname.slice(match.url.length);

    history.push({
      pathname: match.isExact ? nextPath : `${nextPath}/${suff}`,
      search: location.search,
      hash: location.hash,
    });
  }
}

/**
 * regionbar 相关的交互
 *    - 发送 region 列表给 regionbar
 *    - 接受 regionbar 的 region 变更，并且变动整个 app.
 *    - 获取与更新 regionID 相关信息
 */
export default (props: IConsoleContextProp<{regionId?: string}>): Region => {
  const { history, consoleBase, match, location, region: regionConfig = {} } = props;
  const { regionList, regionbarVisiblePaths = [] }  = regionConfig;
  // 默认 Region = 路由的Region > Cookie 的 region > Region 列表中第一个 > 用户指定默认Region >'cn-hangzhou'
  const [currentRegionId, setCurrentRegionId] = useState<string>('');

  const region: Region = {
    ...(consoleBase || ConsoleRegion),
    getCurrentRegionId: (): string => currentRegionId,
  };

  const regionContext = useContext(RegionContext);

  /**
   * 处理路由
   */
  useEffect(() => {
    region.setRegions(regionList);
    // 如果 regionId 不在 region 列表重定向到 regionId 上
    const regionId = determineRegionId(match.params.regionId, currentRegionId, regionList);

    if (currentRegionId !== regionId) {
      // @ts-ignore
      window.__XCONSOLE_CURRENT_REGION_ID__ = regionId;
      regionContext.setActiveRegionId(regionId);
      region.setRegionId(regionId);
      setCurrentRegionId(regionId);
      return reroute(props, regionId);
    }
  }, [match.params.regionId]);

  // 处理 ConsoleBase
  useEffect(() => {
    // update the regionList when regionList change
    region.setRegions(regionList);

    // update the history when region change on the reigonbar
    const unsubscribeRegionChange = region.onRegionChange((payload) => {
      const regionId = determineRegionId(payload.id, currentRegionId, regionList);
      if (regionId !== currentRegionId) {
        reroute(props, regionId);
      }
    });

    const unsubscribeReady = ConsoleBase.onReady(() => {
      region.setRegions(regionList);
      region.setRegionId(currentRegionId);
    });

    return () => {
      unsubscribeRegionChange()
      unsubscribeReady()
    }
  }, [regionList, history, currentRegionId]);

  useEffect(() => {
    region.toggleRegion(false)
    regionbarVisiblePaths.forEach((showRegionPath) => {
      const matches = matchPath(location.pathname, {
        path: showRegionPath,
        exact: true,
        strict: true,
      });
      if (matches) {
        region.toggleRegion(true)
      }
    });
  }, [regionbarVisiblePaths, location.pathname])

  return region;
};
