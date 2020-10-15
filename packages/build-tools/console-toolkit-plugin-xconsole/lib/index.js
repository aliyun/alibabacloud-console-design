"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var constants_1 = require("./constants");
function default_1(api) {
    api.dispatchSync('registerGenerator', 'XConsole', {
        path: path_1.resolve(__dirname, '../generator/index.js'),
        namespace: 'XconsoleProject',
        type: 'git',
        url: constants_1.GENERATOR_URL,
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map