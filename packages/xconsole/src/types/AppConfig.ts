type PathRule = string[] | RegExp[];

interface RegionConfig {
  // 用来描述云产品架构的，单中心，双中心，region 化
  type?: 'center' | 'dcenter' | 'region';
  // region 列表
  regionList?: { id: string; name: string }[];
  // 默认 fallback 的 region
  defaultRegion?: string;
  // 路由匹配到 region 展示或者隐藏
  regionPath?: PathRule;
}

interface ConsoleBaseConfig {
  regionList?: { id: string, name: string }[];
}

interface ConsoleMenuConfig {
  // 展示侧边栏的路径设置
  // 当 displayPath 设置时，不论是否列表为空，侧边栏默认对所有页面都会隐藏
  // 此时 notDisplayPath 的设置将不生效
  // 即设置了 displayPath 时, notDisplayPath 就不起作用了

  // displayPath: [
  //   new RegExp(`^${ROUTE_PREFIX}/dashboard`),
  // ],

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

export interface AppConfig {
  /**
   * region 相关配置
   */
  region?: RegionConfig;
  /**
   * consoleBase 相关配置
   */
  consoleBase?: ConsoleBaseConfig;
  /**
   * consoleMenu 相关配置
   */
  consoleMenu?: ConsoleMenuConfig;
}
