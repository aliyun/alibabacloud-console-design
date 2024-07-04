import { useEffect, useLayoutEffect, useState, useContext, useCallback, useMemo, useRef } from 'react';
import { matchPath } from 'react-router-dom';

import ConsoleBaseFallback from '../console/ConsoleBase';
import ConsoleRegion from './index';
import { reroute } from './reroute';
import { determineRegionId } from './determineRegionId';
import { RegionContext } from '../context/RegionContext';
import { getActiveId } from './cookies';
import type { IConsoleContextRegionProp } from '../types/index';

export type TConsoleRegion = typeof ConsoleRegion;

export interface Region extends TConsoleRegion {
  loading?: boolean;
}

/**
 * regionBar 相关的交互
 * - 发送 regionId 和 regionList 给 regionBar
 * - 监听 regionList 变化，计算更新 regionId
 * - 监听 regionBar 变化，计算更新 regionId
 * - 监听路由变更，计算更新 regionId
 * - 获取与更新 regionID 相关信息
 */
export default (props: IConsoleContextRegionProp<{regionId?: string}>): Region => {
  const {
    history, consoleBase: passInConsoleBase,
    match, location, region: regionConfig = {},
  } = props;
  const {
    regionList, regionbarVisiblePaths = [], globalVisiblePaths = [],
    defaultRegion, disable = false, historyAction,
  } = regionConfig;
  // 默认 Region = 路由的Region > Cookie 的 region > Region 列表中第一个 > 用户指定默认Region >'cn-hangzhou'
  const [currentRegionId, setCurrentRegionId] = useState<string>(
    // 第一次加载时计算初始 regionId
    determineRegionId(match.params.regionId, getActiveId(), regionList, defaultRegion),
  );
  const regionContext = useContext(RegionContext);
  const consoleBase = useMemo(() => passInConsoleBase || ConsoleBaseFallback, [passInConsoleBase]);
  const matchRef = useRef(match);
  const locationRef = useRef(location);

  matchRef.current = match;
  locationRef.current = location;

  /**
   * 计算更新 regionId 状态，也设置临时变量中的 ID
   */
  const setRegionIdWithMemo = useCallback((wantedRegionId: string) => {
    setCurrentRegionId((curRegionId) => {
      const nextRegionId = disable ? wantedRegionId : determineRegionId(wantedRegionId, curRegionId, regionList, defaultRegion);

      (window as {
        __XCONSOLE_CURRENT_REGION_ID__?: string;
      }).__XCONSOLE_CURRENT_REGION_ID__ = nextRegionId;

      return nextRegionId;
    });
  }, [
    disable,
    regionList,
    defaultRegion,
  ]);

  /**
   * 如果是 region 路由，且 regionId 变化时重定向
   */
  const rerouteIfNeed = useCallback((regionId: string) => {
    reroute({
      history,
      match: matchRef.current,
      location: locationRef.current,
    }, regionId, historyAction);
  }, [
    history,
    historyAction,
  ]);

  /**
   * 设置 regionBar 不可点击态
   */
  const setRegionDisabled = useCallback(() => {
    consoleBase.mergeRegionProps({
      disabled: true,
    });

    return () => {
      consoleBase.mergeRegionProps({
        disabled: false,
      });
    };
  }, [consoleBase]);

  /**
   * 根据 regionId 状态更新路由和 regionBar
   */
  useLayoutEffect(() => {
    if (disable) return;

    rerouteIfNeed(currentRegionId);
    // 通知 consoleBase 更新 regionId
    consoleBase.setRegionId(currentRegionId);
    consoleBase.setRegions(regionList);
  }, [
    disable,
    consoleBase,
    regionList,
    currentRegionId,
    rerouteIfNeed,
  ]);

  useEffect(() => {
    // 兼容旧版本的应用
    regionContext.setActiveRegionId(currentRegionId);
  }, [
    regionContext,
    currentRegionId,
  ]);

  /**
   * 根据路由变化更新 regionId
   */
  useEffect(() => {
    if (disable) return;

    setRegionIdWithMemo(match.params.regionId);
  }, [
    disable,
    match.params.regionId,
    setRegionIdWithMemo,
  ]);

  /**
   * 根据路由变化更新 regionBar 展示状态
   */
  useEffect(() => {
    if (disable) return;

    // 如果配置了显示全球的路径，直接展示全球
    const showGlobal = globalVisiblePaths.some((globalPath) => {
      const matches = matchPath(location.pathname, {
        path: globalPath,
        exact: true,
        strict: true,
      });

      if (matches) {
        consoleBase.toggleRegion(true);
        consoleBase.toggleRegionGlobal(true);
        return true;
      }
      return false;
    });

    if (!showGlobal) {
      consoleBase.toggleRegion(false);

      regionbarVisiblePaths.forEach((path) => {
        const matches = matchPath(location.pathname, {
          path,
          exact: true,
          strict: true,
        });

        if (matches) {
          consoleBase.toggleRegion(true);
        }
      });
    }
  }, [
    disable,
    consoleBase,
    globalVisiblePaths,
    regionbarVisiblePaths,
    location.pathname,
  ]);

  /**
   * 根据 regionBar 变化更新 regionId
   */
  useEffect(() => {
    if (disable) return;

    const unsubscribeRegionChange = consoleBase.onRegionChange((payload) => {
      // correctedFrom 是 consoleBase 内部更新发出的，忽略掉
      if (payload.correctedFrom) {
        return;
      }

      setRegionIdWithMemo(payload.id);
    });

    return unsubscribeRegionChange;
  }, [
    disable,
    consoleBase,
    setRegionIdWithMemo,
  ]);

  return {
    ...(consoleBase || ConsoleRegion),
    setRegionDisabled,
    getCurrentRegionId: (): string => currentRegionId,
    setCurrentRegionId: setRegionIdWithMemo,
  };
};
