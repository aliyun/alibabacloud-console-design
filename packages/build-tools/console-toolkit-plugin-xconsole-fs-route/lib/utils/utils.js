"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentName = void 0;
var uuid = 1;
exports.getComponentName = function (namePath) {
    return namePath
        .replace(/\.\./g, '')
        .replace(/(\\|\/)/g, '/')
        .replace(/[-.$:]/g, "_" + uuid++ + "_")
        .replace(/(\/(\w))/g, function (m) { return m.toUpperCase(); })
        .replace(/(\/(\w))/g, '$2');
};
//# sourceMappingURL=utils.js.map