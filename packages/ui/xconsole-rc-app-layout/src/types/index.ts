import { Location } from 'history';

type PathRule = string[] | RegExp[];

export interface INavConfig {
  // 导航标题
  title: string;
  // 导航 key
  key: string;
  // 如果 href 存在就是个 a 链接的外链
  href?: string;
  // a 的 props
  linkProps?: Record<string, any>;
  // 子导航
  subNav?: INavConfig;
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

  // 侧边栏的
  navs: INavConfig[];

  defaultOpenKeys: string[];
  collapsedKeys: string[];
  invisiblePaths: string[];
}

export interface IProp {
  sidebar: ISidebarConfig;
  consoleMenu: IConsoleMenuConfig;
  location: Location;
  children: React.ReactChildren;
}
