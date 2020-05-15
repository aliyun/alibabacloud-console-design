// import createLoader from '@ali/widget-loader'
// const loadWidget = createLoader()
import React from '@alicloud/xconsole/react';
export default (function (_ref, loadOptions) {
  var id = _ref.id,
      version = _ref.version;
  return function () {
    return React.createElement("div", null, "\u56E0\u4E3A\u76EE\u524D\u5F00\u6E90\u7248\u672C widget-loader \u8FD8\u4E0D\u53EF\u7528\uFF0C\u9700\u8981\u5728\u9879\u76EE\u4E2D\u81EA\u884C\u589E\u52A0 widget-loader \u7684\u4F9D\u8D56\uFF0C\u8BF7\u67E5\u770B xconsole \u7F51\u7AD9\u4E2D\u5F00\u53D1\u6587\u6863\u4E0B\u7684\u3010\u5982\u4F55\u81EA\u5B9A\u4E49 widget-loader\u3011\u90E8\u5206\u6765\u8FDB\u884C\u5904\u7406!");
  }; // if (typeof id === 'undefined') {
  //   throw Error(
  //     '[WLM:loader] widget id is required'
  //   )
  // }
  // return loadWidget({ id, version }, loadOptions)
});