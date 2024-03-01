import consoleConfig from './console/index';
import region from './region/index';

export { default as ConsoleBase } from './console/ConsoleBase';
export { default as ConsoleRegion } from './region';
export { default as ConsoleResourceGroup } from './resourceGroup';
export { ConsoleContext } from './context/Context';
export { RegionContext } from './context/RegionContext';

export { default as withConsoleConfig, withRcBaseMessenger } from './withConsoleContext';

export default {
  consoleConfig,
  region,
};

export { default as Gray, useGray } from './rc/Gray';
export { default as ChannelLink, useChannelLink } from './rc/ChannelLink';
export { default as ChannelFeature, useChannelFeature } from './rc/ChannelFeature';