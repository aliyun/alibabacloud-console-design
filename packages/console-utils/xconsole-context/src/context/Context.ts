import { createContext } from 'react';
import region from '../region/index';
import resourceGroup from '../resourceGroup';
import consoleConfig from '../console/index';
import { IConsoleContextValue } from '../types/index';

export const ConsoleContext = createContext<IConsoleContextValue>({
  consoleConfig,
  region,
  resourceGroup,
});
