import consoleConfig from './console/index';
import region from './region/index';

export { ConsoleContext } from './context/Context';

export { default as withConsoleConfig } from './withConsoleContext';

export default {
  consoleConfig,
  region,
};
