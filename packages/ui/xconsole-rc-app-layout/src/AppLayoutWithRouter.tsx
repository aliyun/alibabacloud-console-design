import React, { useCallback, useEffect, useState } from 'react';
import { isFunction } from 'lodash-es';
import { withRouter } from 'react-router-dom';

import { IProps, ISidebarConfig } from './types/index';
import Context from './Context';
import AppLayout from './AppLayout';
import useCollapsed from './hooks/useCollapsed';

let noticeFlag = false;

const XConsoleAppLayout = (props: IProps) => {
  const { sidebar: rawSidebar, consoleMenu, location, children, menuParams, style } = props;
  const { pathname } = location;

  let sidebar: ISidebarConfig;

  if (isFunction(rawSidebar)) {
    sidebar = (rawSidebar as Function)(location);
  } else {
    sidebar = rawSidebar as ISidebarConfig;
  }

  const [title, setTitle] = useState(sidebar.title || 'XConsole');
  const [navs, setNavs] = useState(sidebar.navs || []);
  const [navVisible, setNavVisible] = useState(consoleMenu?.visible ?? true);

  if (
    noticeFlag === false &&
    (typeof sidebar.defaultOpenKeys !== 'undefined' ||
      typeof sidebar.collapsedKeys !== 'undefined' ||
      typeof sidebar.invisiblePaths !== 'undefined')
  ) {
    noticeFlag = true;
    console.warn(
      '[xconsole rc-app-layout] sidebar.js 中关于 defaultOpenKeys collapsedKeys invisiblePaths 的配置不再推荐使用，请在 appConfig.js 中配置 consoleMenu， 具体配置信息及字段说明请前往官网查看 【开发指南】 文档。',
    );
  }

  useEffect(() => {
    if (sidebar.title !== title) {
      setTitle(sidebar.title);
    }
    if (JSON.stringify(sidebar.navs) !== JSON.stringify(navs)) {
      setTitle(sidebar.title);
    }
    setNavs(sidebar.navs);
  }, [JSON.stringify(sidebar)]);

  const onNavTriggerClick = useCallback((fn: () => void) => {
    const cb = (e: MessageEvent) => {
      if (e.data.type === 'xconsole:on_nav_click') {
        fn();
      }
    };
    window.addEventListener('message', cb);

    return () => window.removeEventListener('message', cb);
  }, []);

  const { collapsed, setCollapsed, onNavCollapseTriggerClick } = useCollapsed(
    pathname,
    consoleMenu?.collapsedPath || [],
  );

  const hideNav = useCallback(() => {
    setNavVisible(false);
  }, []);

  const showNav = useCallback(() => {
    setNavVisible(true);
  }, []);

  return (
    <Context.Provider
      value={{
        collapsed,
        hideNav,
        showNav,
        sidebar: {
          title,
          navs,
          collapsedKeys: [],
          onItemClick: sidebar.onItemClick,
          onOpen: sidebar.onOpen,
        },
        setTitle,
        setNavs,
        setCollapsed,
        onNavTriggerClick,
      }}
    >
      <AppLayout
        collapsed={collapsed}
        onNavCollapseTriggerClick={onNavCollapseTriggerClick}
        consoleMenu={consoleMenu}
        location={location}
        menuParams={menuParams}
        visible={navVisible}
        style={style}
      >
        {children}
      </AppLayout>
    </Context.Provider>
  );
};

export default withRouter(XConsoleAppLayout);
