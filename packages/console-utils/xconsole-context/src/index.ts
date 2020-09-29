import consoleConfig from './console/index';
import region from './region/index';

export { ConsoleContext } from './context/Context';
export { RegionContext } from './context/RegionContext';

export { default as withConsoleConfig } from './withConsoleContext';

export default {
  consoleConfig,
  region,
};

export { default as Gray } from './rc/Gray';
export { default as ChannelLink } from './rc/ChannelLink';
export { default as ChannelFeature } from './rc/ChannelFeature';