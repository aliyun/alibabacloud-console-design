
基础配置的文件在项目工程下的 src/appConfig.js， 这部分的配置大部分和项目运行时相关

### config.region
* Type: object
* Default: {}

对于云产品 Region 化的相关配置，详细信息请参见 Region 化控制台开发.

#### region.type

* Type: ```'center' | 'dcenter' | 'region'```
* Default:  ```'center'```

用来描述云产品架构的，单中心，双中心，region 化。 如果配置类型是 ```region```, 下面的配置才会生效。

#### region.regionList

* Type: ```{ id: string; name: string }[];```
* Default:  ```[]```

当前云产品的 region 列表，通常是通过云产品实现的 ```DescribeRegions``` 的接口来获取 Region 信息。 Viper 应用配置中的 静态接口调用 配置上，这个把 Region 列表 会输出到页面模板上。

#### region.defaultRegion
* Type: string
* Default:  ```’‘```

对于 Region 化 云产品默认选择的地域。

#### config.reginbarVisiblePaths
* Type: string
* Default:  ```string[]```

regionBar 显示的路径

例子：
```javascript
reginbarVisiblePaths: [
    '/:regionId/basic-list',
    '/overview'
  ]
```

### config.consoleMenu

* Type: object
* Default: {}

对于侧边栏的配置信息

#### config.notDisplayPath

* Type:  ```string[] | RegExp[];```
* Default: {}

不展示右侧 appMenu 的路径

#### config.collapsedPath

* Type:  ```string[] | RegExp[];```
* Default: {}

appMenu 默认收起的路径

#### config.defaultOpen

* Type:  ```string[] | RegExp[];```
* Default: {}

菜单默认展开的路径

### config.errorCenter

### 全量类型描述
```

type PathRule = string[] | RegExp[];

interface RegionConfig {
  // 用来描述云产品架构的，单中心，双中心，region 化
  type?: 'center' | 'dcenter' | 'region';
  // region 列表
  regionList?: { id: string; name: string }[];
  // 默认 fallback 的 region
  defaultRegion?: string;
  // 路由匹配到 region 展示或者隐藏
  reginbarVisiblePaths?: PathRule;
}

interface ConsoleBaseConfig {
  regionList?: { id: string; name: string }[];
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
   * consoleMenu 相关配置
   */
  consoleMenu?: ConsoleMenuConfig;
}
```