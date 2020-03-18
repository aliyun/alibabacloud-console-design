module.exports = {
  presets: [
    [
      "@alicloud/console-toolkit-preset-wind-component",
      {
        moduleName: "@ali/widget-load-management",
        external: ["@ali/widget-loader"],
        globals: {
          "@ali/widget-loader": "widgetLoader",
          "@ali/widget-load-management": "WidgetLoadManagement"
        }
      }
    ]
  ]
};
