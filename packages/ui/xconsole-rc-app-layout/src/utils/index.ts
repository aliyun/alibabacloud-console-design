import { generatePath, matchPath } from 'dva/router';
import isUndefined from 'lodash.isundefined';
import get from 'lodash/get';
import map from 'lodash/map';
import { PathRule } from '../types/index';

export const transTitleToHeader = (title: string) => title;

export const transNavToItems = (navs) => {
  return map(navs, (nav) => {
    return {
      ...nav,
      label: nav.title,
      visible: isUndefined(nav.hide) ? true : !nav.hide,
      items: isUndefined(nav.subNav)
        ? null
        : map(nav.subNav, (sub) => ({
          ...sub,
          label: sub.title,
          visible: isUndefined(sub.hide) ? true : !sub.hide,
        })),
    };
  });
};

const getToPath = (extraParams) => (routeProps, item) => {
  let path = '';
  const routeParams = get(routeProps, 'match.params') || {};
  try {
    path = generatePath(item.key, {
      ...routeParams,
      ...extraParams,
    });
  } catch (error) {
    console.warn(`[XConsole AppLayout] ${error}`);
  }
  return path;
};

export const withDefaultToPath = (items, extraParams) => {
  return map(items, (item) => {
    const _item = { ...item };
    if (item.key && !item.href) {
      _item.to = getToPath(extraParams);
    }
    if (item.items) {
      _item.items = map(item.items, (i) => {
        const subItem = { ...i };
        if (!i.href) {
          subItem.to = getToPath(extraParams);
        }
        return subItem;
      });
    }
    return _item;
  });
};

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
