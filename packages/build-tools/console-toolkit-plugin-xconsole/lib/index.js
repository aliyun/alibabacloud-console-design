"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var constants_1 = require("./constants");
function default_1(api, options) {
    api.dispatchSync('registerGenerator', 'XConsole', {
        path: path_1.resolve(__dirname, '../generator/index.js'),
        namespace: 'XconsoleProject',
        type: 'git',
        url: constants_1.GENERATOR_URL,
    });
    // api.on('onChainWebpack', async (config: Chain) => {
    //   config.resolve.alias
    //     .set('@ali/wind', '@alife/alicloud-components')
    //     .set('@alicloud/console-components', '@alife/alicloud-components');
    // });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map