"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveWithExt = exports.existWithExt = exports.resolveExt = void 0;
var fs_extra_1 = require("fs-extra");
exports.resolveExt = function (path) {
    for (var _i = 0, _a = ['.js', '.jsx', '.ts', '.tsx']; _i < _a.length; _i++) {
        var ext = _a[_i];
        if (fs_extra_1.existsSync("" + path + ext)) {
            return ext;
        }
    }
    return undefined;
};
exports.existWithExt = function (path) {
    return exports.resolveExt(path) !== undefined;
};
exports.resolveWithExt = function (path) {
    var ext = exports.resolveExt(path);
    if (ext) {
        return "" + path + ext;
    }
    return undefined;
};
//# sourceMappingURL=resolveExt.js.map