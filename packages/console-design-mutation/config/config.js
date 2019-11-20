module.exports = {
  presets: [
    [
      "@alicloud/console-toolkit-preset-official",
      {
        moduleName: "@alicloud/console-design-mutation",
        external: ["@alicloud/console-widget-loader"],
        globals: {
          "@alicloud/console-widget-loader": "widgetLoader",
          "@alicloud/console-design-mutation": "ConsoleMutation"
        }
      }
    ]
  ]
};
