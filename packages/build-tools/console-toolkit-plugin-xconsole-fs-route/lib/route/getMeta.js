"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalMeta = exports.getRouteMeta = void 0;
var fs = require("fs");
var path_1 = require("path");
var lodash_1 = require("lodash");
var console_toolkit_shared_utils_1 = require("@alicloud/console-toolkit-shared-utils");
var constants_1 = require("../constants");
var resolveExt_1 = require("../utils/resolveExt");
// import * as pathToRegexp from 'path-to-regexp';
var RouteMeta_1 = require("./RouteMeta");
var GlobalMeta_1 = require("./GlobalMeta");
/**
 *
 * @param root
 * @param name
 * @param dir
 */
function getRouteMetasImpl(param) {
    var currentDir = param.currentDir, name = param.name, distDir = param.distDir, cwd = param.cwd, isRoot = param.isRoot;
    var igonreDirs = constants_1.IGNORE_DIR;
    if (isRoot) {
        igonreDirs.push(constants_1.GLOBAL_DIR);
    }
    if (!fs.existsSync(currentDir)) {
        return [];
    }
    var fileList = fs.readdirSync(currentDir).filter(function (fileName) { return !fileName.startsWith('.'); });
    console_toolkit_shared_utils_1.debug('fs-route', 'scan file for %s fileList is %j', currentDir, fileList);
    // 查找出对应的文件夹
    var directories = fileList.filter(function (fileName) {
        return fs.statSync(path_1.resolve(currentDir, fileName)).isDirectory() && igonreDirs.indexOf(fileName) === -1;
    }).reverse();
    var pages = [];
    // 如果这个文件夹下全部是文件夹
    // 那么递归遍历这些子文件夹获取页面信息
    pages = lodash_1.flatten(directories.map(function (fileName) {
        var filePath = path_1.resolve(currentDir, fileName);
        return getRouteMetasImpl({
            currentDir: filePath,
            name: fileName,
            cwd: cwd,
            distDir: distDir
        });
    }));
    var indexExt = resolveExt_1.resolveExt(path_1.resolve(currentDir, 'index'));
    var layoutPath = resolveExt_1.resolveWithExt(path_1.resolve(currentDir, '..', constants_1.LAYOUT));
    if (indexExt) {
        pages.push(new RouteMeta_1.RouteMeta({
            directory: currentDir,
            page: name,
            cwd: cwd,
            distDir: distDir,
            layoutPath: layoutPath,
            ext: indexExt
        }));
    }
    // 返回这个文件夹下 所有页面的信息
    return pages;
}
function getRouteMeta(directory, distDir) {
    var routeMetas = getRouteMetasImpl({
        currentDir: directory,
        cwd: directory,
        name: path_1.basename(directory),
        distDir: distDir,
        isRoot: true
    });
    var globalRouteMetas = getRouteMetasImpl({
        currentDir: path_1.resolve(directory, constants_1.GLOBAL_DIR),
        cwd: directory,
        name: path_1.basename(directory),
        distDir: distDir,
    });
    return [routeMetas, globalRouteMetas];
}
exports.getRouteMeta = getRouteMeta;
function getGlobalMeta(cwd, opts) {
    return new GlobalMeta_1.default(cwd, opts);
}
exports.getGlobalMeta = getGlobalMeta;
//# sourceMappingURL=getMeta.js.map