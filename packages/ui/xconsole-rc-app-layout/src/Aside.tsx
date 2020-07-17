import React, { useState, useRef, useEffect, useContext } from 'react';
import { matchPath, withRouter } from 'dva/router';
import AppLayout from '@alicloud/console-components-app-layout';
import each from 'lodash.foreach';
import Nav from './Nav';
import Context from './Context';
import { IProp } from './types/index';

const XConsoleAppLayoutAside: React.FC<Partial<IProp>> = ({
  consoleMenu = {},
  location: { pathname },
  children,
}: Partial<IProp>) => {
  const { sidebar } = useContext(Context);
  const [collapsed, setCollapsed] = useState(false);

  const {
    displayPath,
    notDisplayPath,
    collapsedPath = [],
    defaultOpen = [],
  } = consoleMenu;

  const getPathIsMatch = (path, paths = []) => {
    let pathIsMatch = false;
    paths.some((_path) => {
      let isMatch = null;

      if (_path === '*') {
        pathIsMatch = true;
        return true;
      }

      if (_path instanceof RegExp) {
        isMatch = _path.test(path);
      } else {
        isMatch = matchPath(path, {
          path: _path,
          exact: true,
          strict: true,
        });
      }

      if (isMatch) {
        pathIsMatch = true;
        return true;
      }
      return false;
    });

    return pathIsMatch;
  };

  let showSidebar = true;

  // 当 displayPath 被设置时， 所有路径下都不展示侧边栏
  if (typeof displayPath !== 'undefined') {
    showSidebar = false;
    showSidebar = getPathIsMatch(pathname, displayPath);
  } else {
    showSidebar = !getPathIsMatch(
      pathname,
      notDisplayPath || sidebar.invisiblePaths || []
    );
  }

  sidebar.defaultOpenKeys = sidebar.defaultOpenKeys || [];
  defaultOpen.forEach((item) => {
    sidebar.defaultOpenKeys.push(item);
  });

  // save prev collapsed
  const prevState = useRef();
  useEffect(() => {
    prevState.current = collapsed;
  });

  useEffect(() => {
    let collapse = false;
    const collapsedTarget =
      collapsedPath.length > 0 ? collapsedPath : sidebar.collapsedKeys || [];
    each(collapsedTarget, (key) => {
      if (matchPath(pathname, { path: key, exact: true, strict: true })) {
        collapse = true;
        return true;
      }
    });
    setCollapsed(collapse);
  }, [pathname]);

  const toggleNavCollapsed = (prevCollapsed) => {
    setCollapsed(
      typeof prevCollapsed === 'boolean' ? !prevCollapsed : !prevState.current
    );
  };

  const nav = showSidebar ? <Nav {...sidebar} /> : null;
  return (
    <AppLayout
      adjustHeight={50}
      nav={nav}
      navCollapsed={collapsed}
      onNavCollapseTriggerClick={toggleNavCollapsed}
    >
      {children}
    </AppLayout>
  );
};

XConsoleAppLayoutAside.displayName = 'XConsoleAppLayoutAside';

export default XConsoleAppLayoutAside;
