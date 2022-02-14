import React from 'react';

import { ISidebarConfig, INavConfig } from './types/index';

interface IContextValue {
  sidebar: Partial<ISidebarConfig>;
  setTitle: (title: string) => void;
  setNavs: (navs: INavConfig[]) => void;
  setCollapsed: (collapsed: boolean) => void;
  onNavTriggerClick: (fn: () => void) => (() => void);
}

export default React.createContext<IContextValue>({
  sidebar: {},
  setTitle: (title: string) => {/* nothing */},
  setNavs: (navs: INavConfig[]) => {/* nothing */},
  setCollapsed: (collapsed: boolean) => {/* nothing */},
  onNavTriggerClick: (fn: () => void) => () => {/* nothing */},
});
