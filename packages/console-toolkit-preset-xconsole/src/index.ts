import presetWind from '@alicloud/console-toolkit-preset-official';


export default (config: any, args: any) => {
  const presetConfig = presetWind({
    ...config,
    disableUpdator: true
  }, args);

  const { plugins } = presetConfig;
  const { routes } = config;
  if (!config.disableFsRoute) {
    plugins.push([
      '@alicloud/console-toolkit-plugin-xconsole-fs-route',
      {
        routes,
        appId: config.appId
      }
    ]);
  }

  if (!config.disableConsoleOS) {
    plugins.push([
      '@alicloud/console-toolkit-plugin-os', {
        id: config.appId
      }
    ]);
  }

  plugins.push([
    '@alicloud/console-toolkit-plugin-block',
    {
      ...config.block
    }
  ]);

  return presetConfig;
};
