import React, { useContext } from 'react';
import AppLayout from '@alicloud/console-components-app-layout';
import { XConsoleTheme } from '@alicloud/console-components-console-menu';

import Nav from './Nav';
import Context from './Context';
import { isPathMatch } from './utils/index';
import type { IAsideProps, PathRule } from './types/index';

export let XConsoleAppLayoutHook: any;

/**
 * 计算侧边栏展示状态
 * @param pathname
 * @param displayPath
 * @param notDisplayPath
 * @param invisiblePaths
 * @returns
 */
const computeSidebarVisibleStatus = (
  pathname: string,
  displayPath?: PathRule,
  notDisplayPath?: PathRule,
  invisiblePaths?: PathRule,
): boolean => {
  let sidebarVisible = true;
  if (typeof displayPath !== 'undefined') {
    sidebarVisible = isPathMatch(pathname, displayPath);
  } else {
    sidebarVisible = !isPathMatch(
      pathname,
      notDisplayPath || invisiblePaths || [],
    );
  }
  return sidebarVisible;
};

const XConsoleAppLayoutAside: React.FC<Partial<IAsideProps>> = (
  props,
) => {
  const {
    consoleMenu = {},
    location,
    children,
    menuParams,
    collapsed,
    onNavCollapseTriggerClick,
    visible,
    adjustHeight,
    style,
  } = props;
  const { pathname = '' } = location || {};

  const { sidebar } = useContext(Context);

  const {
    displayPath,
    notDisplayPath,
    defaultOpen = [],
  } = consoleMenu;

  const shouldVisibleInCurrentPath = computeSidebarVisibleStatus(
    pathname,
    displayPath,
    notDisplayPath,
    sidebar.invisiblePaths,
  );

  // 合并 sidebar 的 defaultOpenKeys
  sidebar.defaultOpenKeys = defaultOpen;

  return (
    <XConsoleTheme>
      <AppLayout
        adjustHeight={adjustHeight || 50}
        nav={
          shouldVisibleInCurrentPath && visible ?
            <Nav {...sidebar} currentPath={pathname} menuParams={menuParams} />
            :
            null
        }
        navCollapsed={collapsed}
        onNavCollapseTriggerClick={onNavCollapseTriggerClick}
        style={style}
      >
        {children}
      </AppLayout>
    </XConsoleTheme>
  );
};

export default XConsoleAppLayoutAside;
