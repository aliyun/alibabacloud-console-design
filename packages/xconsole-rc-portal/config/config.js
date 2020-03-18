module.exports = {
  presets: [
    [
      "@alicloud/console-toolkit-preset-wind-component",
      {
        moduleName: "XconsoleRcPortal",
        external: {
          '@ali/widget-loader': {
            root: 'widgetLoader',
            commonjs2: 'widgetLoader',
            commonjs: 'widgetLoader',
            amd: 'widgetLoader',
          },
        },
        useTypescript: true
      }
    ]
  ]
};