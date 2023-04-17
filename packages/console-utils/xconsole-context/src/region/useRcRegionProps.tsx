import { useEffect, useState, useContext } from 'react';
import { matchPath, generatePath } from 'react-router';
import isFunction from 'lodash/isFunction';

import ConsoleRegion from './index';
import { getActiveId } from './cookies';
import { determineRegionId } from './determineRegionId';
import { RegionContext } from '../context/RegionContext';
import { IConsoleContextRegionProp } from '../types/index';
import { IPayloadRegion } from 'src/types/ConsoleBase';


const hasRegionId = (match) => {
  // eslint-disable-next-line no-prototype-builtins
  return match.params && match.params.hasOwnProperty('regionId');
}

export const reroute = (props: IConsoleContextRegionProp<{regionId?: string}>, nextRegionId: string) => {
  const { history, match, location } = props;
  if (match && match.path && hasRegionId(match)) {
    const { path, params } = match;

    if (nextRegionId === params.regionId) {
      return;
    }

    const nextPath = generatePath(path, {
      ...(params || {}),
      regionId: nextRegionId
    });
    // 可能通过 window.history.pushState 改变路由导致 react-router location 对象没有更新
    const suff = window.location.pathname.slice(match.url.length);

    history[props.region?.historyAction || 'push']({
      pathname: match.isExact ? nextPath : `${nextPath}/${suff}`.replace('//', '/'),
      search: location.search,
      hash: location.hash,
    });
  }
}

/**
 * 为了适配新版本的 region, 但是由于
 * @param props 
 * @returns 
 */
const useRcRegionProps = (props:  IConsoleContextRegionProp<{regionId?: string}>) => {
  const { consoleBase, match, location, region: regionConfig = {} } = props;
  const { regionList : regionListConfig, regionbarVisiblePaths = [], globalVisiblePaths = [], defaultRegion }  = regionConfig;
  // 默认 Region = 路由的Region > Cookie 的 region > Region 列表中第一个 > 用户指定默认Region >'cn-hangzhou'
  const [currentRegionId, setCurrentRegionId] = useState<string>('');
  const regionContext = useContext(RegionContext);
  // 兼容 regionList 的异步逻辑
  const [loading, setLoading] = useState(isFunction(regionListConfig));
  const [regionList, setRegionList] = useState(isFunction(regionListConfig) ? [] : regionListConfig);

  // 设置内存变量中的 Id， 也设置设置临时变量中的 ID
  const setRegionIdWithMemo = (regionId: string) => {
    // @ts-ignore
    window.__XCONSOLE_CURRENT_REGION_ID__ = regionId;

    // 兼容旧版本的应用
    regionContext.setActiveRegionId(regionId);

    setCurrentRegionId(regionId);
  }

  useEffect(() => {
    (async () => {
      if (isFunction(regionListConfig)) {
        setLoading(true);
        const regionList = await regionListConfig(location);
        setRegionList(regionList);
        setLoading(false);
      }
    })();
  }, [location.pathname]);

  /**
   * 处理路由
   */
  useEffect(() => {
    if (loading) return;
    // 如果 regionId 不在 region 列表重定向到 regionId 上
    const regionId = determineRegionId(match.params.regionId, currentRegionId, regionList, defaultRegion);

    if (currentRegionId !== regionId) {
      setRegionIdWithMemo(regionId)
      return reroute(props, regionId);
    }
  }, [match.params.regionId, loading]);

  const showGlobal = globalVisiblePaths.some((globalPath) => {
    const matches = matchPath(location.pathname, {
      path: globalPath,
      exact: true,
      strict: true,
    });
    if (matches) {
      return true;
    }
    return false;
  })


  const onRegionChange = (id: string, regionName: string, correctedFrom?: string) => {
    if (correctedFrom || loading) {
      return;
    }
    const regionId = determineRegionId(id, currentRegionId, regionList, defaultRegion);
    if (regionId !== currentRegionId) {
      reroute(props, regionId);
    }
  }

  const regionsVisible = regionbarVisiblePaths.some((showRegionPath) => {
    const matches = matchPath(location.pathname, {
      path: showRegionPath,
      exact: true,
      strict: true,
    });
    return !!matches;
  });

  return {
    loading,
    global: showGlobal,
    regions: regionList,
    visible: regionsVisible,
    regionId: currentRegionId,
    onChange: onRegionChange,
    // 为了兼容老版版本提供出去的 region context 的 value
    region: {
      ...(consoleBase || ConsoleRegion),
      getCurrentRegionId: (): string => currentRegionId || determineRegionId(match.params.regionId, getActiveId(), regionList, defaultRegion),
      setCurrentRegionId: setRegionIdWithMemo
    }
  }
}

export default useRcRegionProps;