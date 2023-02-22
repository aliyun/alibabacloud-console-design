import { useEffect, useState, useContext } from 'react';
import { matchPath, generatePath } from 'react-router';

import ConsoleRegion from './index';
import { reroute } from './useRcRegionProps';
import ConsoleBase from '../console/ConsoleBase';
import { IConsoleContextRegionProp } from '../types/index';
import { determineRegionId } from './determineRegionId';
import { RegionContext } from '../context/RegionContext';
import { getActiveId } from './cookies';

type ConsoleRegion = typeof ConsoleRegion;

interface Region extends ConsoleRegion {
  loading?: boolean;
}

/**
 * regionbar 相关的交互
 *    - 发送 region 列表给 regionbar
 *    - 接受 regionbar 的 region 变更，并且变动整个 app.
 *    - 获取与更新 regionID 相关信息
 */
export default (props: IConsoleContextRegionProp<{regionId?: string}>): Region => {
  const { history, consoleBase, match, location, region: regionConfig = {} } = props;
  const { regionList, regionbarVisiblePaths = [], globalVisiblePaths = [], defaultRegion }  = regionConfig;
  // 默认 Region = 路由的Region > Cookie 的 region > Region 列表中第一个 > 用户指定默认Region >'cn-hangzhou'
  const [currentRegionId, setCurrentRegionId] = useState<string>('');
  const regionContext = useContext(RegionContext);

  // 设置内存变量中的 Id， 也设置设置临时变量中的 ID
  const setRegionIdWithMemo = (regionId: string) => {
    // @ts-ignore
    window.__XCONSOLE_CURRENT_REGION_ID__ = regionId;

    // 兼容旧版本的应用
    regionContext.setActiveRegionId(regionId);

    setCurrentRegionId(regionId);
  }

  const region: Region = {
    ...(consoleBase || ConsoleRegion),
    getCurrentRegionId: (): string => currentRegionId || determineRegionId(match.params.regionId, getActiveId(), regionList, defaultRegion),
    setCurrentRegionId: setRegionIdWithMemo
  };


  /**
   * 处理路由
   */
  useEffect(() => {
    region.setRegions(regionList);
    // 如果 regionId 不在 region 列表重定向到 regionId 上
    const regionId = determineRegionId(match.params.regionId, currentRegionId, regionList, defaultRegion);

    if (currentRegionId !== regionId) {
      region.setRegionId(regionId);
      setRegionIdWithMemo(regionId)
      return reroute(props, regionId);
    }
  }, [match.params.regionId, currentRegionId, regionList, defaultRegion]);

  // 处理 ConsoleBase
  useEffect(() => {
    // update the history when region change on the regionbar
    const unsubscribeRegionChange = region.onRegionChange((payload) => {
      if (payload.correctedFrom) {
        return;
      }
      const regionId = determineRegionId(payload.id, currentRegionId, regionList, defaultRegion);
      if (regionId !== currentRegionId) {
        reroute(props, regionId);
      }
    });

    const unsubscribeReady = ConsoleBase.onReady(() => {
      region.setRegions(regionList);
      region.setRegionId(currentRegionId);
    });

    // 如果配置了显示全球的路径，直接展示全球
    const showGlobal = globalVisiblePaths.some((globalPath) => {
      const matches = matchPath(location.pathname, {
        path: globalPath,
        exact: true,
        strict: true,
      });
      if (matches) {
        region.toggleRegion(true)
        region.toggleRegionGlobal(true)
        return true;
      }
      return false;
    })

    if (showGlobal) {
      return;
    }

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

    return () => {
      unsubscribeRegionChange()
      unsubscribeReady()
    }
  }, [regionList, history, regionbarVisiblePaths, globalVisiblePaths, location.pathname, currentRegionId, defaultRegion]);

  return region;
};
