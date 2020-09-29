"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var lodash_1 = require("lodash");
var chokidar = require("chokidar");
var generator_1 = require("./generator");
var getMeta_1 = require("./route/getMeta");
var constants_1 = require("./constants");
exports.default = (function (api, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        api.on('onDevStart', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, watchAndBuild(api, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        api.on('onBuildStart', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, watchAndBuild(api, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        api.on('onChainWebpack', function (config) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                buildRoute(api, options);
                config
                    .entry('index')
                    .clear()
                    .add("./" + constants_1.TMP_DIR + "/index.js")
                    .end()
                    .resolve
                    .alias
                    .merge({
                    '~': path_1.resolve(api.getCwd(), 'src')
                })
                    .end();
                return [2 /*return*/];
            });
        }); });
        api.registerSyncAPI('getRouteMeta', function () {
            return getRouteMetaFromDir(api, options);
        });
        return [2 /*return*/];
    });
}); });
function watchAndBuild(api, options) {
    return __awaiter(this, void 0, void 0, function () {
        var watcher;
        return __generator(this, function (_a) {
            watcher = chokidar.watch('./src/pages/**')
                .on('all', lodash_1.debounce(function () {
                console.log('监听到 pages 下文件变化，重新生成 .xconsole 内容');
                buildRoute(api, options);
            }, 100));
            process.on('SIGINT', function () {
                watcher.close();
            });
            return [2 /*return*/];
        });
    });
}
function getRouteMetaFromDir(api, options) {
    var tmpPath = path_1.resolve(api.getCwd(), "src/" + constants_1.TMP_DIR);
    var directory = path_1.resolve(api.getCwd(), 'src/pages');
    var _a = getMeta_1.getRouteMeta(directory, tmpPath), routes = _a[0], globalRoutes = _a[1];
    var global = getMeta_1.getGlobalMeta(api.getCwd(), {
        indexRoute: "" + lodash_1.get(options, 'routes.index', null),
        mode: "" + lodash_1.get(options, 'routes.mode', ''),
        prefix: "" + lodash_1.get(options, 'routes.prefix', ''),
        appId: options.appId,
    });
    return {
        routes: routes,
        globalRoutes: globalRoutes,
        global: global
    };
}
function buildRoute(api, options) {
    var tmpPath = path_1.resolve(api.getCwd(), "src/" + constants_1.TMP_DIR);
    var directory = path_1.resolve(api.getCwd(), 'src/pages');
    var _a = getMeta_1.getRouteMeta(directory, tmpPath), routes = _a[0], globalRoutes = _a[1];
    var global = getMeta_1.getGlobalMeta(api.getCwd(), {
        indexRoute: "" + lodash_1.get(options, 'routes.index', null),
        mode: "" + lodash_1.get(options, 'routes.mode', ''),
        prefix: "" + lodash_1.get(options, 'routes.prefix', ''),
        appId: options.appId,
    });
    var generator = new generator_1.Generator(tmpPath);
    api.emit('onBuildRoutes');
    generator.generate({
        routes: routes,
        globalRoutes: globalRoutes,
        global: global
    });
}
//# sourceMappingURL=index.js.map