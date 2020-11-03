// @ts-ignore
import Cookie from 'js-cookie';

// 默认标识
const DEFAULT_COOKIE_KEY = 'activeRegionId';
const CURRENT_DEFAULT_COOKIE_KEY = 'currentRegionId';

/**
 * 从 cookie 中获取当前的 region id
 * @param {String=} key
 */
export const getActiveId = (key = '') => {
  if (key === '') {
    return (
      // window.__XCONSOLE_CURRENT_REGION_ID__ 是个临时变量，用来暂存当前控制台 regionId, 防止其他控制台切换之后造成的 Cookie 中 regionId 失效的问题
      // @ts-ignore
      window.__XCONSOLE_CURRENT_REGION_ID__ ||
      Cookie.get(CURRENT_DEFAULT_COOKIE_KEY) ||
      Cookie.get(DEFAULT_COOKIE_KEY) ||
      'cn-hangzhou'
    );
  }
  return Cookie.get(key);
};
