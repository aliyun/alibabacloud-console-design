import { History, Location } from 'history';
import { match } from 'react-router-dom';

import region from '../region/index';
import { IPayloadRegion } from './ConsoleBase';
import consoleConfig, { ConsoleBase } from '../console/index';
import resourceGroup from '../resourceGroup';

type PathRule = string[] | RegExp[];

export interface RegionConfig {
  // 用来描述云产品架构的，单中心，双中心，region 化
  type?: 'center' | 'dcenter' | 'region';

  // region 列表
  regionList?: IPayloadRegion[] | ((location: Location) => Promise<IPayloadRegion[]>);

  // 默认 fallback 的 region
  defaultRegion?: string;

  // 路由匹配到 region 展示或者隐藏
  regionbarVisiblePaths?: PathRule;

  // 路由匹配到 全球的 展示或者隐藏
  globalVisiblePaths?: PathRule;

  historyAction?: 'push' | 'replace';
}

export interface IRegionConfigProps extends RegionConfig {
  /**
   * region 列表
   */
  regionList?: IPayloadRegion[];

  /**
   * 是否关闭路由同步功能和 regionId 校验逻辑
   */
  disable?: boolean;
}

export enum ResourceGroupType {
  path = 'path',
  query = 'query'
}

export interface ResourceGroupConfig {
  disable?: boolean;
  enable?: boolean;
  // 是否开启资源组
  resourceGroupVisiblePaths?: PathRule;

  // 资源组ID 被持久化 在哪个地方
  routeType?: 'path' | 'query';

  historyAction?: 'push' | 'replace';
}

export interface IConsoleContextValue {
  consoleConfig: typeof consoleConfig;
  region: typeof region;
  resourceGroup: typeof resourceGroup;
}

export interface IConsoleContextProp<T extends {} = {}> {
  consoleBase?: typeof ConsoleBase;
  history: History;
  region?: RegionConfig;
  resourceGroup?: ResourceGroupConfig;
  location: Location;
  match: match<T>;
  appConfig: {
    aplus?: {
      customPaths?: string[];
    };
  };
}

export interface IConsoleContextRegionProp<T = {}> extends IConsoleContextProp<T> {
  region?: IRegionConfigProps;
}

export interface IRegionContextValue {
  setActiveRegionId: (regionId: string) => void;
  activeRegionId?: string;
}
