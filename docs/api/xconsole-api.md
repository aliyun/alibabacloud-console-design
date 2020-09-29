## UI 组件
XConsole UI 里面包含了绝大部分的 控制台的 UI 组件，不需要你单独的引入 各种 console-component 的包

```javascript
import { Page, PageProps, Button  } from '@alicloud/xconsole/ui';
```

XConsole UI 中包含了 组件库中 所有组件，处于升级考虑，非特殊情况，不要直接在 package.json 使用其他单独的包.

* 全部基础组件
* Page 页面布局组件
* Table 表格组件
* DataFields 数据展示组件
* Actions, LinkButton  表格操作组件
* StatusIndicator 状态展示组件
* SlidePanel, SlidePanelGroup, SlidePanelItem 侧边
* Result 结果组件
* DateTime 日期展示组件
* Description

## Utils 方法库

XConsole Utils 里面包括了和 控制台 相关的一些业务库包括：

* 国际化
* 请求库
* 控制台配置数据获取
* 日志上报

```javascript
import { intl, createService, ConsoleContext, Query, Mutation } from '@alicloud/xconsole/utils';
```
#### intl

获取国际化文案获取方法，具体国际化相关配置参见如下文档，详细 API 参见 console-component-intl 的接口文档

#### createService

控制台请求库，里面包含了一些常见请求包括 OpenAPI, InnerAPI, ROA 风格 API

``` javascript
const describeInstances = createService('ecs', 'DescribeInstances', opts)

(async () => {
  const data = describeInstnaces({/* 你的参数 */})
  console.log(data)
})()
```

opts 可以配置内容

```
apiType?: ApiType;
ignoreError?: boolean;
useCors?: boolean;
data?: IOptionsData;
risk?: Risk;
url?: string;
baseURL?: string;
method?: AxiosRequestConfig['method'];
requestStartTime?: number;
originParams?: any;
originData?: any;
mock?: boolean;
```

#### ConsoleUitls

控制台的配置的工具方法
在 ```ConsoleUitls.consoleConfig.xxxxxx``` 中封装了和控制台配置打交道的部分，包括了当前用户，当前渠道，当前灰度等等，具体 API 参考如下:

##### consoleConfig.isCertified()

获取用户实名认证状态

##### consoleConfig.getChannel()

获取用户当前渠道

##### consoleConfig.getfEnv()

获取用户当前

##### consoleConfig.getLang()

获取当前用户语言

##### consoleConfig.getLocale()

获取当前用户语言

##### consoleConfig.getAccoutLoginLink()

获取当前登录地址

##### consoleConfig.getSecToken()

获取 secToken 用户防止 csrf 攻击

##### consoleConfig.getAccountName()

获取当前用户名

##### consoleConfig.getMainAccountPK()

获取当前用户主账号 PK， 主要用于 Ram User 的主账号获取

##### consoleConfig.getCurrentPK()

获取当前用户账号 PK。

##### consoleConfig.getAccountType()

获取当前账号的账号类型，主账号，子账号，STS。

##### consoleConfig.getOpenStatus(code: string)

获取某个产品的开通状态

##### consoleConfig.getGrayStatus(grayId: string)

获取当前用户灰度状态

##### consoleConfig.getChannelFeature(featureId: string)

获取渠道功能开关状态

##### consoleConfig.getChannelLink(linkId: string)

获取渠道链接

##### consoleConfig.getLabel()

获取某个用户当前账号上的标签

##### consoleConfig.getUserPreference()

获取当前用户设置偏好

##### consoleConfig.getRuleConfig()

获取当前规则中心的信息

##### consoleConfig.getRegions()

获取当前 location 中配置的信息

##### consoleConfig.getStaticAPI(field: string)

获取 Viper 中配置的 staticAPI 配置的信息

#### ConsoleContext

通过 React Context 的 API 获取到相应的方法库

```javascript
import { ConsoleContext } from '@alicloud/console-context';

const App = (props) => {
    const { consoleConfig } = useContext(ConsoleContext);
    return (
	  <>
      	<div>{consoleConfig.getChannel()}</div>;
     </>)
 }
```

#### Gray

灰度功能的 React 组件快捷调用，详细关于控制台灰度参见如下文档

```javascript
import { Gray } from '@ali/xconsole/utils'

export () => (
  <Gray grayId="user:create">
    <UserCreator />
  </Gray>
)
```

#### ChannelLink

渠道链接的 React 组件快捷调用，详细关于控制台灰度参见如下文档

```javascript
import { Link } from '@ali/xconsole/utils'

export () => (
  <Link linkId="user:create:help">
    创建用户帮助文档
  </Link>
)
```

#### ChannelFeature

渠道链接的 React 组件快捷调用，详细关于控制台灰度参见如下文档

```javascript
import { ChannelFeature } from '@ali/xconsole/utils'

export () => (
  <ChannelFeature id="user:create:help">
    创建用户帮助文档
  </ChannelFeature>
)
```

#### Query (即将废弃)

详见 [使用 Query 获取数据](https://xconsole.aliyun-inc.com/develop/evif6q)， 推荐使用更方便的 Hooks 实现请求

#### Mutation (即将已废弃)

详见 [使用 Mutation 实现变更动作](https://xconsole.aliyun-inc.com/develop/evif6q)， 推荐使用更方便的 Hooks 实现请求


#### RegionContext (即将已废弃)

通过 React Context 的 获取当前控制台激活的 RegionID

```javascript
import { RegionContext } from '@alicloud/console-context';

const App = (props) => {
    const { activeRegionId } = useContext(RegionContext);
    return (
	  <>
      	<div>{activeRegionId}</div>;
     </>)
 }
```
## Hooks

XConsole 封装的各种业务 React Hooks.

#### useService

#### useOpenApi
请求 OpenApi 的快捷调用

```javascript
import { useOpenApi } from '@alicloud/xconsole/hooks';

const { data } = useOpenApi<Response, Params>('ecs', 'DescribeInstances', {})
```

#### useInnerApi
请求 InnerApi 的快捷调用

```javascript
const { data } = useInnerApi<Response, Params>('ecs', 'DescribeInstances', {})
```

#### useAppApi
请求 oneConsole 微服务 Api 的快捷调用

```javascript
const { data } = useAppApi<Response, Params>('ecs', 'DescribeInstances', {})
```

#### useRoaApi
请求 ROA 风格 Open Api 的快捷调用

```javascript
const { data } = useRoaApi<Response, Params>('ecs', 'DeleteInstance', {})
```

#### useHistory

获取内置的 react-router 的 history 对象来操作路由。

```javascript
import { useHistory } from "@alicloud/xconsole/hooks";

function HomeButton() {
  let history = useHistory();
  
  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```

#### useLocation

获取当前 react router 的 Location 对象。

```javascript
import { useHistory } from "@alicloud/xconsole/hooks";
const Page = () => {
	const location = useLocation()
	return <div>{location.path}</div>
}
```
#### useParams

#### useRouteMatch

#### useChannelLink

获取渠道链接

``` javascript
const links = useChannelLink('channelLinkId')
```

#### useChannelFeature

获取渠道功能开关状态

``` javascript
const featureStatus = useChannelFeature('channelFeatureId')
```

#### useGray

获取当前用户灰度状态

``` javascript
const grayStatus = useChannelFeature('grayId')
```

## Alfa 微前端

XConsole 内置了阿里云的微前端方案，更多详细内容参见 微前端集成

```javascript
import { createWidget, createMicroApp  } from '@alicloud/xconsole/alfa';
```

#### createWidget

#### createMicroApp


