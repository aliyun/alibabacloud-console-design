import { History } from 'history';
import { match } from 'react-router-dom';

import region from "../region/index";
import { IPayloadRegion } from "./ConsoleBase";
import consoleConfig, { ConsoleBase } from '../console/index';

export interface IConsoleContextValue {
  consoleConfig: typeof consoleConfig;
  region: typeof region;
}

export interface IConsoleContextProp<T = {}> {
  regionList: IPayloadRegion[];
  consoleBase?: typeof ConsoleBase;
  history: History;
  match: match<T>;
}