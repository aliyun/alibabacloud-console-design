import Cookie from 'js-cookie'; // 默认标识

var DEFAULT_COOKIE_KEY = 'activeRegionId';
var CURRENT_DEFAULT_COOKIE_KEY = 'currentRegionId';
/**
 * 从 cookie 中获取当前的 region id
 * @param {String=} key
 */

var getActiveId = function getActiveId() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (key === '') {
    return Cookie.get(CURRENT_DEFAULT_COOKIE_KEY) || Cookie.get(DEFAULT_COOKIE_KEY) || 'cn-hangzhou';
  }

  return Cookie.get(key);
};