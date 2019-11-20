module.exports = {
  presets: [
    [
      "@alicloud/console-toolkit-preset-official",
      {
        moduleName: "@alicloud/console-design-result",
        external: ["@alicloud/console-widget-loader"],
        globals: {
          "@alicloud/console-widget-loader": "widgetLoader",
          "@alicloud/console-design-result": "ConsoleResult"
        },
        useTypescript: true
      }
    ]
  ]
};
