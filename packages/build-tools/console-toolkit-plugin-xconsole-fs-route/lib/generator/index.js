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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var ejs = require("ejs");
var _BOM = /^\uFEFF/;
/**
 *
 */
var Generator = /** @class */ (function () {
    function Generator(dir) {
        this.dir = dir;
    }
    Generator.prototype.generate = function (app) {
        this.ensureDir();
        this.genRoutes(app);
        this.getRouteConfig(app);
        // await genCreateModel();
        this.genIndex(app);
        this.genApp(app);
        this.genInitializer(app);
    };
    Generator.prototype.genRoutes = function (app) {
        this.render('routes', app);
    };
    Generator.prototype.genIndex = function (app) {
        this.render('index', app);
    };
    Generator.prototype.genApp = function (app) {
        this.render('app', app);
    };
    Generator.prototype.genInitializer = function (app) {
        this.render('initializer', app);
    };
    Generator.prototype.getRouteConfig = function (app) {
        app.globalRoutes.forEach(function (route) {
            route.config = __assign(__assign({}, route.config), { appMenu: false });
        });
        var routesMetas = __spreadArrays(app.globalRoutes, app.routes);
        var imports = routesMetas.map(function (route) { return route.getComponents(); }).join('\n');
        var routes = routesMetas.map(function (route) { return route.getRouteCode(); }).join(',\n');
        var route_config = "\n" + imports + "\nexport default{\n  global: " + JSON.stringify(app.global, null, 4) + ",\n  routes: [\n    " + routes + "\n  ]\n};";
        fs_1.writeFileSync(path_1.resolve(this.dir, 'route_config.js'), route_config, 'UTF-8');
    };
    Generator.prototype.ensureDir = function () {
        if (!fs_1.existsSync(this.dir)) {
            fs_1.mkdirSync(this.dir);
        }
    };
    Generator.prototype.render = function (name, data) {
        if (data === void 0) { data = {}; }
        var filePath = path_1.resolve(__dirname, '../../tpl', name + ".js.ejs");
        var templateStr = fs_1.readFileSync(filePath, 'UTF-8').toString().replace(_BOM, '');
        var content = ejs.render(templateStr, data);
        fs_1.writeFileSync(path_1.resolve(this.dir, name + ".js"), (content && content.trim()) + "\n", 'utf-8');
        return;
    };
    return Generator;
}());
exports.Generator = Generator;
//# sourceMappingURL=index.js.map