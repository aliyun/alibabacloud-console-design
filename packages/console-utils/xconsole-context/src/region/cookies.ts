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
      Cookie.get(CURRENT_DEFAULT_COOKIE_KEY) ||
      Cookie.get(DEFAULT_COOKIE_KEY) ||
      'cn-hangzhou'
    );
  }
  return Cookie.get(key);
};
