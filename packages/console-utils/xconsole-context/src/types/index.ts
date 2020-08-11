import { History, Location } from 'history';
import { match } from 'react-router-dom';

import region from "../region/index";
import { IPayloadRegion } from "./ConsoleBase";
import consoleConfig, { ConsoleBase } from '../console/index';

type PathRule = string[] | RegExp[];

export interface RegionConfig {
  // 用来描述云产品架构的，单中心，双中心，region 化
  type?: 'center' | 'dcenter' | 'region';
  // region 列表
  regionList?: IPayloadRegion[];
  // 默认 fallback 的 region
  defaultRegion?: string;
  // 路由匹配到 region 展示或者隐藏
  reginbarVisiblePaths?: PathRule;
}

export interface IConsoleContextValue {
  consoleConfig: typeof consoleConfig;
  region: typeof region;
}

export interface IConsoleContextProp<T = {}> {
  consoleBase?: typeof ConsoleBase;
  history: History;
  region?: RegionConfig;
  location: Location;
  match: match<T>;
}

export interface IRegionContextValue {
  setActiveRegionId: (regionId: string) => void;
  activeRegionId?: string;
}
