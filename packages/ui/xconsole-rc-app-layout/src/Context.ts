import React from 'react';

import { ISidebarConfig, INavConfig } from './types/index';

interface IContextValue {
  sidebar: Partial<ISidebarConfig>;
  collapsed?: boolean;
  setTitle: (title: string) => void;
  setNavs: (navs: INavConfig[]) => void;
  setCollapsed: (collapsed: boolean) => void;
  hideNav: () => void;
  showNav: () => void;
  onNavTriggerClick: (fn: () => void) => (() => void);
}

export default React.createContext<IContextValue>({
  sidebar: {},
  collapsed: undefined,
  setTitle: (title: string) => {/* nothing */},
  setNavs: (navs: INavConfig[]) => {/* nothing */},
  setCollapsed: (collapsed: boolean) => {/* nothing */},
  hideNav: () => {/* nothing */},
  showNav: () => {/* nothing */},
  onNavTriggerClick: (fn: () => void) => () => {/* nothing */},
});
