import type { RouteComponentProps } from 'react-router-dom';
import type { Location } from 'history';
import type { IRoutableItemDescriptor } from '@alicloud/console-components-console-menu/lib/ItemDescriptor';

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
  /**
   * 是否展示侧边栏，优先级高于 displayPath 和 notDisplayPath
   * 一般用于手动控制侧边栏状态
   */
  visible?: boolean;

  /**
   * 展示侧边栏的路径设置，优先级高于 notDisplayPath
   * 当 displayPath 设置时，不论是否列表为空，侧边栏默认对所有页面都会隐藏
   * 此时 notDisplayPath 的设置将不生效
   */
  displayPath?: string[];

  /**
   * 不展示侧边栏的路径设置，优先级低于 displayPath
   */
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
  /**
   * 整个导航标题
   */
  title: string;

  /**
   * 侧边栏的列目配置
   */
  navs: INavConfig[];

  /**
   * 菜单项点击事件
   */
  onItemClick?: (key: string, itemInfo: any, e: MouseEvent) => void;

  /**
   * 打开或关闭子菜单触发的回调函数
   */
  onOpen?: (key: string[], extra: { key: string; open: boolean }) => void;

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

export interface IProps extends RouteComponentProps {
  sidebar: ISidebarConfig | SidebarCallBack;
  consoleMenu?: IConsoleMenuConfig;
  children?: React.ReactChildren;
  menuParams?: Record<string, any>;
  collapsed?: boolean;
  onNavCollapseTriggerClick?: any;
  style?: Record<string, any>;
}

export interface IAsideProps extends IProps {
  visible?: boolean;
  /**
     * 调整AppLayout的高度。AppLayout高度计算公式：`calc(100vh - adjustHeight px)`。详见文档的【adjustHeight: 布局高度的调整】小节
     * @defaultValue 50
     */
  adjustHeight?: string | number | (() => number);
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
  onOpen?: (key: string[], extra: { key: string; open: boolean }) => void;
}
