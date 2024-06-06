import AppLayout from './AppLayoutWithRouter';

import { ISidebarConfig, IConsoleMenuConfig } from './types/index';

export { default as AppLayoutContext } from './Context';

export default AppLayout;

export type SidebarConfig = ISidebarConfig;

export type ConsoleMenuConfig = IConsoleMenuConfig;
