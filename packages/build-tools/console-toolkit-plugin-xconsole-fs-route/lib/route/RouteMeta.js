"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteMeta = void 0;
var fs = require("fs");
var path_1 = require("path");
var console_toolkit_shared_utils_1 = require("@alicloud/console-toolkit-shared-utils");
var constants_1 = require("../constants");
var utils_1 = require("../utils/utils");
var getCommentSettings_1 = require("../utils/getCommentSettings");
var RouteMeta = /** @class */ (function () {
    function RouteMeta(opts) {
        var directory = opts.directory, cwd = opts.cwd, distDir = opts.distDir, ext = opts.ext, layoutPath = opts.layoutPath;
        this.dir = directory;
        this.distDir = distDir;
        this.style = path_1.resolve(directory, constants_1.SYTLE);
        this.component = path_1.resolve(directory, constants_1.COMPONENT_ENTRY)
            .replace(/\.(j|t)sx?/g, ext);
        this.config = this.existPath(path_1.resolve(directory, constants_1.CONFIG));
        this.model = this.existPath(path_1.resolve(directory, constants_1.MODEL));
        this.importPath = path_1.relative(this.distDir, this.component)
            .replace(/(\\|\/)/g, '/')
            .replace(/\.(j|t)sx?/g, '');
        this.componentName = utils_1.getComponentName(path_1.relative(distDir, this.dir));
        this.routePath = path_1.relative(cwd, directory)
            .replace(/\.\./g, '')
            .replace(/(\\|\/)/g, '/')
            .replace(/\/\$/g, '/:')
            .replace(/^\$/g, ':');
        this.layoutPath = layoutPath;
        if (layoutPath) {
            this.layoutImportPath = path_1.relative(this.distDir, layoutPath)
                .replace(/(\\|\/)/g, '/')
                .replace(/\.(j|t)sx?/g, '');
            this.layoutComponentName = utils_1.getComponentName(path_1.relative(distDir, layoutPath));
        }
        this.buildMeta();
    }
    RouteMeta.prototype.existPath = function (path, required) {
        if (required === void 0) { required = false; }
        if (fs.existsSync(path)) {
            return path;
        }
        if (required) {
            throw new Error("path not exists " + path);
        }
    };
    RouteMeta.prototype.buildMeta = function () {
        this.getConfig();
        this.getLayout();
        this.getLang();
        this.getHTML();
    };
    RouteMeta.prototype.getConfig = function () {
        var code = fs.readFileSync(this.component, 'UTF-8');
        this.config = getCommentSettings_1.getCommentConfig(code);
        console_toolkit_shared_utils_1.debug('fs-route', "Config is: %s", JSON.stringify(this.config));
    };
    RouteMeta.prototype.getLayout = function () { };
    RouteMeta.prototype.getComponents = function () {
        var imports = [
            "import " + this.componentName + " from '" + this.importPath + "'",
        ];
        if (this.layoutPath) {
            imports.push("import " + this.layoutComponentName + " from '" + this.layoutImportPath + "'");
        }
        return imports.join('\n');
    };
    RouteMeta.prototype.getRouteCode = function () {
        return "{\n      path: '" + this.routePath + "',\n      component: " + this.componentName + ",\n      layout: " + (this.layoutPath ? this.layoutComponentName : 'null') + ",\n      config: " + JSON.stringify(this.config, null, 8) + "\n    }";
    };
    RouteMeta.prototype.getLang = function () { };
    RouteMeta.prototype.getHTML = function () { };
    return RouteMeta;
}());
exports.RouteMeta = RouteMeta;
//# sourceMappingURL=RouteMeta.js.map