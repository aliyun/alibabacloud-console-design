import React from 'react';

import { ISidebarConfig, INavConfig } from './types/index';

interface IContextValue {
  sidebar: Partial<ISidebarConfig>;
  setTitle: (title: string) => void;
  setNavs: (navs: INavConfig[]) => void;
}

export default React.createContext<IContextValue>({
  sidebar: {},
  setTitle: (title: string) => {/* nothing */},
  setNavs: (navs: INavConfig[]) => {/* nothing */},
});
