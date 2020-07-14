import { useEffect, useState } from 'react';

import ConsoleBase from '../console/ConsoleBase';

import ConsoleRegion from './index';
import { getActiveId } from './cookies';
import { IConsoleContextProp } from '../types/index';
import { determineRegionId } from './determineRegionId';

type Region = typeof ConsoleRegion;

const reroute = (props: IConsoleContextProp<{regionId?: string}>, nextRegionId: string) => {
  const { history, match } = props;
  if (match && match.path && match.params.regionId) {
    const { path } = match;
    history.push(path.replace(':regionId', nextRegionId));
  }
}

/**
 * regionbar 相关的交互
 *    - 发送 region 列表给 regionbar
 *    - 接受 regionbar 的 region 变更，并且变动整个 app.
 *    - 获取与更新 regionID 相关信息
 */
export default (props: IConsoleContextProp<{regionId?: string}>): Region => {
  const { history, regionList, consoleBase, match } = props;

  // 默认 Region = 路由的Region > Cookie 的 region > Region 列表中第一个 > 用户指定默认Region >'cn-hangzhou'
  const [currentRegionId, setCurrentRegionId] = useState<string>(
    determineRegionId(match.params.regionId, '', regionList)
  );

  const region: Region = {
    ...(consoleBase || ConsoleRegion),
    getCurrentRegionId: (): string => currentRegionId,
  };

  /**
   * 处理路由
   */
  useEffect(() => {
    if (!match.params.regionId) {
      return;
    }

    const regionId = determineRegionId(match.params.regionId, currentRegionId, regionList);

    // 如果 regionId 不在 region 列表重定向到 regionId 上
    if (currentRegionId !== match.params.regionId) {
      reroute(props, regionId);
    }

  }, [currentRegionId, match.params.regionId]);

  // 处理 ConsoleBase
  useEffect(() => {
    // update the regionList when regionList change
    region.setRegions(regionList);
    region.setRegionId(currentRegionId);

    // update the history when region change on the reigonbar
    region.onRegionChange((payload) => {
      // 如果有路由 & 并且路由里面带着 regionId
      reroute(props, payload.id)
      setCurrentRegionId(payload.id);
    });

    ConsoleBase.onReady(() => {
      region.setRegions(regionList);
      region.setRegionId(currentRegionId);
    });

  }, [regionList, history]);

  return region;
};
