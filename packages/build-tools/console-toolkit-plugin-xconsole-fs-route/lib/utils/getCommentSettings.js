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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentConfig = void 0;
// Reference: https://github.com/umijs/umi/blob/master/packages/umi-build-dev/src/routes/getYamlConfig.js
var extractComments = require("esprima-extract-comments");
var yaml = require("js-yaml");
exports.getCommentConfig = function (code) {
    var comments = extractComments(code);
    return comments
        .slice(0, 1)
        .filter(function (c) { return c.value.includes(':') && c.loc && c.loc.start.line === 1; })
        .reduce(function (memo, item) {
        var value = item.value;
        var v = value.replace(/^(\s+)?\*/gm, '');
        try {
            var yamlResult = yaml.safeLoad(v);
            return __assign(__assign({}, memo), yamlResult);
        }
        catch (e) {
            console.error("yaml load failed: " + e);
        }
        console.log(memo);
        return memo;
    }, {});
};
//# sourceMappingURL=getCommentSettings.js.map