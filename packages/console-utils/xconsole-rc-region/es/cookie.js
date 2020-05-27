import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import Cookie from 'js-cookie'; // 默认标识

var DEFAULT_COOKIE_KEY = 'activeRegionId'; // 区分国内站和国际站

var REG_HOST = /\.?(aliyun|alibabacloud)(\.[\w.-]+)/;
/**
 * 获取兜底的 host
 * @returns {String}
 */

var getFallbackHost = function getFallbackHost() {
  if (process.env.NODE_ENV === 'production') {
    // 如果在生产环境, 使用更可靠的 `.aliyun.com` 作为兜底
    return '.aliyun.com';
  } else {
    // 在开发环境下随机而变
    return window.location.hostname;
  }
};
/**
 * 获取用于存储 cookie 的 host
 * @returns {String}
 */


var getHost = function getHost() {
  var hostname = window.location.hostname;
  var matches = hostname.match(REG_HOST);

  if (!matches || matches.length < 3) {
    return getFallbackHost();
  }

  var _matches = _slicedToArray(matches, 3),
      hostSpecifier = _matches[1],
      suffix = _matches[2];

  return ".".concat(hostSpecifier).concat(suffix);
};
/**
 * 从 cookie 中获取当前的 region id
 * @param {String=} key
 */


var getActiveId = function getActiveId() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COOKIE_KEY;
  return Cookie.get(key);
};
/**
 * 将 region id 存放到 cookie 中
 * @param {String} value
 * @param {Object=} options
 */


var setActiveId = function setActiveId(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var opts = _objectSpread({
    key: DEFAULT_COOKIE_KEY,
    domain: getHost()
  }, options);

  var key = opts.key,
      restOptions = _objectWithoutProperties(opts, ["key"]);

  Cookie.set(key, value, restOptions);
};

export { getActiveId, setActiveId };