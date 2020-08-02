"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var resolveExt_1 = require("../utils/resolveExt");
/**
 *
 */
var GlobalMeta = /** @class */ (function () {
    // globalModals: boolean;
    function GlobalMeta(cwd, options) {
        this.hasUIConfig = resolveExt_1.existWithExt(path_1.resolve(cwd, 'src/ui'));
        this.hasWidgetLoader = resolveExt_1.existWithExt(path_1.resolve(cwd, 'src/loader'));
        this.hasEntryCode = resolveExt_1.existWithExt(path_1.resolve(cwd, 'src/app'));
        this.hasAppConfig = resolveExt_1.existWithExt(path_1.resolve(cwd, 'src/appConfig'));
        this.hasLayout = resolveExt_1.existWithExt(path_1.resolve(cwd, 'src/layout'));
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