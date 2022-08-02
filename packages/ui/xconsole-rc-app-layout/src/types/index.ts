import { RouteComponentProps } from 'dva/router';
import { Location } from 'history'
import { IRoutableItemDescriptor } from '@alicloud/console-components-console-menu/lib/ItemDescriptor';

export type PathRule = string[] | RegExp[];

export interface INavConfig extends IRoutableItemDescriptor {
  // 导航标题
  title: string;
  // 导航 key
  key: string;
  // 子导航
  subNav?: INavConfig[];
  // 高亮的
  highlight?: string[];
}

export interface IConsoleMenuConfig {
  // 展示侧边栏的路径设置
  // 当 displayPath 设置时，不论是否列表为空，侧边栏默认对所有页面都会隐藏
  // 此时 notDisplayPath 的设置将不生效
  // 即设置了 displayPath 时, notDisplayPath 就不起作用了

  displayPath?: string[];

  notDisplayPath?: PathRule;

  /**
   * 默认收起侧边栏的路径设置
   */
  collapsedPath?: string[];

  /**
   * 默认展开的目录
   */
  defaultOpen?: string[];
}

export interface ISidebarConfig {
  // 整个导航标题
  title: string;

  // 侧边栏的列目配置
  navs: INavConfig[];

  // 菜单项点击事件
  onItemClick: (key: string, itemInfo: any, e: MouseEvent) => void;

  /**
   * @deprecated
   */
  defaultOpenKeys?: string[];
  /**
   * @deprecated
   */
  collapsedKeys?: string[];
  /**
   * @deprecated
   */
  invisiblePaths?: string[];
}

export type SidebarCallBack = (location: Location) => ISidebarConfig;

export interface IProp extends RouteComponentProps {
  sidebar: ISidebarConfig | SidebarCallBack;
  consoleMenu?: IConsoleMenuConfig;
  children?: React.ReactChildren;
  menuParams: Record<string, any>;
  collapsed?: boolean;
  onNavCollapseTriggerClick?: any;
}

export interface IMenuProps {
  header?: string;
  title?: string;
  navs?: INavConfig[];
  items?: INavConfig[];
  currentPath?: string;
  menuParams?: Record<string, any>;
  defaultOpenKeys?: string[];
  collapsedKeys?: PathRule;
  onItemClick?: (key: string, itemInfo: any, e: MouseEvent) => void;
}
