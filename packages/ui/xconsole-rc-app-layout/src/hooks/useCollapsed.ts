import { useState, useRef, useEffect } from 'react';
import { matchPath } from 'dva/router';
import { PathRule } from '../types/index';

const useCollapsed = (pathname: string, collapsedPath: PathRule) => {
  const [collapsed, setCollapsed] = useState(false);
  // save prev collapsed
  const prevState = useRef<boolean>();

  useEffect(() => {
    prevState.current = collapsed;
  });

  useEffect(() => {
    const collapse = collapsedPath.some((key) =>
      matchPath(pathname, { path: key, exact: true, strict: true })
    );
    setCollapsed(collapse);
  }, [pathname]);

  const onNavCollapseTriggerClick = (prevCollapsed: boolean): void => {
    setCollapsed(
      typeof prevCollapsed === 'boolean' ? !prevCollapsed : !prevState.current
    );
    window.postMessage({type: 'xconsole:on_nav_click'}, null);
  };

  return {
    collapsed,
    setCollapsed,
    onNavCollapseTriggerClick,
  };
};

export default useCollapsed;
