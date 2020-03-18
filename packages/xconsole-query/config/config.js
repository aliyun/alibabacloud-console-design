module.exports = {
  presets: [
    [
      '@alicloud/console-toolkit-preset-wind-component',
      {
        moduleName: '@alicloud/xconsole-query',
        external: ['@ali/widget-loader'],
        globals: {
          '@ali/widget-loader': 'widgetLoader',
          '@alicloud/xconsole-query': 'XconsoleQuery',
        },
      },
    ],
  ],
};
