"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var console_toolkit_preset_official_1 = require("@alicloud/console-toolkit-preset-official");
exports.default = (function (config, args) {
    var presetConfig = console_toolkit_preset_official_1.default(__assign(__assign({}, config), { disableUpdator: true }), args);
    var plugins = presetConfig.plugins;
    var routes = config.routes;
    if (!config.disableFsRoute) {
        plugins.push([
            '@alicloud/console-toolkit-plugin-xconsole-fs-route',
            {
                routes: routes,
                appId: config.appId
            }
        ]);
    }
    if (!config.disableConsoleOS) {
        plugins.push([
            '@alicloud/console-toolkit-plugin-os', {
                id: config.appId
            }
        ]);
    }
    plugins.push([
        '@alicloud/console-toolkit-plugin-block',
        __assign({}, config.block)
    ]);
    return presetConfig;
});
//# sourceMappingURL=index.js.map