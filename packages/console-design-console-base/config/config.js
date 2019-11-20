module.exports = {
  presets: [
    [
      "@alicloud-toolkit-preset-wind-component",
      {
        moduleName: "@alicloud/console-design-console-base",
        external: ["@alicloud/console-widget-loader"],
        globals: {
          "@alicloud/console-widget-loader": "widgetLoader",
          "@alicloud/console-design-console-base": "ConsoleBase"
        }
      }
    ]
  ]
};
