module.exports = {
  presets: [
    [
      "@alicloud/console-toolkit-preset-wind-component",
      {
        moduleName: "@alicloud/xconsole-service",
        external: ["@ali/widget-loader"],
        globals: {
          "@ali/widget-loader": "widgetLoader",
          "@alicloud/xconsole-service": "XconsoleService"
        },
        useTypescript: true
      }
    ]
  ]
};
