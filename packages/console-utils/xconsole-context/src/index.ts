import consoleConfig from './console/index';
import region from './region/index';

export { ConsoleContext } from './context/Context';
export { RegionContext } from './context/RegionContext';

export { default as withConsoleConfig } from './withConsoleContext';

export default {
  consoleConfig,
  region,
};
