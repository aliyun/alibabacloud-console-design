import { generatePath, match as IMatch } from 'react-router-dom';

import type { IConsoleContextRegionProp } from '../types/index';

/**
 * 根据路由匹配符里是否有 regionId 参数来判断是否是 region 化路由
 * @param match
 * @returns
 */
const hasRegionId = (match: IMatch) => {
  // eslint-disable-next-line no-prototype-builtins
  return match.params && match.params.hasOwnProperty('regionId');
};

/**
 * 重定向至新的 region 化路由
 * @param props
 * @param nextRegionId
 * @returns
 */
export const reroute = (
  props: Pick<IConsoleContextRegionProp<{regionId?: string}>, 'history' | 'match' | 'location'>,
  nextRegionId: string,
  historyAction = 'push',
) => {
  const { history, match, location } = props;
  if (match && match.path && hasRegionId(match)) {
    const { path, params } = match;

    if (nextRegionId === params.regionId) {
      return;
    }

    const nextPath = generatePath(path, {
      ...(params || {}),
      regionId: nextRegionId,
    });
    // 可能通过 window.history.pushState 改变路由导致 react-router location 对象没有更新
    const stuff = window.location.pathname.slice(match.url.length);

    history[historyAction || 'push']({
      pathname: match.isExact ? nextPath : `${nextPath}/${stuff}`.replace('//', '/'),
      search: location.search,
      hash: location.hash,
    });
  }
};
