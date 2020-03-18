module.exports = {
  presets: [
    [
      "@alicloud/console-toolkit-preset-wind-component",
      {
        moduleName: "XconsoleRcResult",
        useTypescript: true,
        externals: {
          "@alicloud/console-components": {
            root: 'wind',
            commonjs2: '@alicloud/console-components',
            commonjs: '@alicloud/console-components',
            amd: '@alicloud/console-components',
          }
        }
      }
    ]
  ]
};