import { useState, useRef, useEffect } from 'react';
import { matchPath } from 'react-router-dom';

const useCollapsed = (pathname: string, collapsedPath: string[]) => {
  const [collapsed, setCollapsed] = useState(false);
  // save prev collapsed
  const prevState = useRef<boolean>();

  useEffect(() => {
    prevState.current = collapsed;
  });

  useEffect(() => {
    const collapse = collapsedPath.some((key) =>
      matchPath(pathname, { path: key, exact: true, strict: true }));
    setCollapsed(collapse);
  }, [pathname, collapsedPath]);

  const onNavCollapseTriggerClick = (prevCollapsed: boolean): void => {
    setCollapsed(
      typeof prevCollapsed === 'boolean' ? !prevCollapsed : !prevState.current,
    );
    window.postMessage({ type: 'xconsole:on_nav_click' });
  };

  return {
    collapsed,
    setCollapsed,
    onNavCollapseTriggerClick,
  };
};

export default useCollapsed;
