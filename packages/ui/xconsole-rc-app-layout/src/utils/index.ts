import { matchPath } from 'react-router-dom';

import type { PathRule } from '../types/index';

/**
 * 判断一个路径是否在给定的路由规则数组中
 * @param {string} path 需要测试的路径
 * @param {PathRule} paths 路由的数组
 */
export const isPathMatch = (path: string, paths: PathRule = []): boolean => {
  return paths.some((_path) => {
    let isMatch = null;

    // 如果是正则，通过正则表达式测试
    if (_path instanceof RegExp) {
      isMatch = _path.test(path);
    } else {
      // 如果是 * 直接返回 true
      if (_path === '*') {
        return true;
      }
      // 如果是字符串，则利用 react-router-dom 的 matchPath 做匹配，参考 https://reactrouter.com/web/api/matchPath
      isMatch = matchPath(path, {
        path: _path,
        exact: true,
        strict: true,
      });
    }

    if (isMatch) {
      return true;
    }
    return false;
  });
};
