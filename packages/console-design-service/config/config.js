module.exports = {
  presets: [
    [
      "@alicloud-toolkit-preset-wind-component",
      {
        moduleName: "@alicloud/console-design-service",
        external: ["@alicloud/console-widget-loader"],
        globals: {
          "@alicloud/console-widget-loader": "widgetLoader",
          "@alicloud/console-design-service": "ConsoleService"
        }
      }
    ]
  ]
};
