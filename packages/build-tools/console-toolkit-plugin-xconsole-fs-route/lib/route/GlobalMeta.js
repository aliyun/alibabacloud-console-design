"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path_1 = require("path");
/**
 *
 */
var GlobalMeta = /** @class */ (function () {
    // globalModals: boolean;
    function GlobalMeta(cwd, options) {
        this.hasUIConfig = fs.existsSync(path_1.resolve(cwd, 'src/ui.js'));
        this.hasWidgetLoader = fs.existsSync(path_1.resolve(cwd, 'src/loader.js'));
        this.hasEntryCode = fs.existsSync(path_1.resolve(cwd, 'src/app.js'));
        this.hasAppConfig = fs.existsSync(path_1.resolve(cwd, 'src/appConfig.js'));
        this.hasLayout = fs.existsSync(path_1.resolve(cwd, 'src/layout.js'));
        this.indexRoute = options.indexRoute;
        this.prefix = options.prefix;
        this.mode = options.mode || 'browser';
        this.appId = options.appId || 'os-app';
        this.parseIndexRoute();
    }
    GlobalMeta.prototype.parseIndexRoute = function () {
        var indexRoute = this.indexRoute;
        this.redirect = indexRoute;
    };
    return GlobalMeta;
}());
exports.default = GlobalMeta;
//# sourceMappingURL=GlobalMeta.js.map