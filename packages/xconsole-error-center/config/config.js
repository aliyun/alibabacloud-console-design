module.exports = {
  presets: [
    [
      '@alicloud/console-toolkit-preset-wind-component',
      {
        moduleName: '@alicloud/xconsole-error-center',
        external: ['@ali/widget-loader'],
        globals: {
          '@ali/widget-loader': 'widgetLoader',
          '@alicloud/xconsole-error-center': 'XconsoleErrorCenter',
        },
      },
    ],
  ],
};
