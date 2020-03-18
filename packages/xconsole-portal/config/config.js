module.exports = {
  presets: [
    [
      "@alicloud/console-toolkit-preset-wind-component",
      {
        moduleName: "@alicloud/xconsole-portal",
        external: ["@ali/widget-loader"],
        globals: {
          "@ali/widget-loader": "widgetLoader",
          "@alicloud/xconsole-portal": "XconsolePortal"
        }
      }
    ]
  ]
};
