import React, { useState } from 'react';
import { withRouter } from 'dva/router';
import { IProp } from './types/index';
import Context from './Context';
import Aside from './Aside';

let noticeFlag = false;

const XConsoleAppLayout: React.FunctionComponent<IProp> = (props: IProp) => {
  const { sidebar, consoleMenu, location, children } = props;

  const [title, setTitle] = useState(sidebar.title || 'XConsole');
  const [navs, setNavs] = useState(sidebar.navs || []);

  if (
    noticeFlag === false &&
    (typeof sidebar.defaultOpenKeys !== 'undefined' ||
      typeof sidebar.collapsedKeys !== 'undefined' ||
      typeof sidebar.invisiblePaths !== 'undefined')
  ) {
    noticeFlag = true;
    console.warn(
      '[xconsole rc-app-layout] sidebar.js 中关于 defaultOpenKeys collapsedKeys invisiblePaths 的配置不再推荐使用，请在 appConfig.js 中配置 consoleMenu， 具体配置信息及字段说明请前往官网查看 【开发指南】 文档。'
    );
  }

  return (
    <Context.Provider
      value={{
        sidebar: { title, navs, collapsedKeys: [] },
        setTitle,
        setNavs,
      }}
    >
      <Aside consoleMenu={consoleMenu} location={location}>
        {children}
      </Aside>
    </Context.Provider>
  );
};

export default withRouter(XConsoleAppLayout);
