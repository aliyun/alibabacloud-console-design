module.exports = {
  presets: [
    [
      '@alicloud/console-toolkit-preset-wind-component',
      {
        moduleName: '@alicloud/xconsole-console-base',
        external: ['@ali/widget-loader'],
        globals: {
          '@ali/widget-loader': 'widgetLoader',
          '@alicloud/xconsole-console-base': 'XconsoleConsoleBase',
        },
      },
    ],
  ],
};
