# XConsole Util

通用的 Console 方法库， 用于和 阿里云 Console 环境打交道包括

- OneConsole
- RegionBar
- 资源组
- Biz Widget

## 用法

### 基础用法

```javascript
import ConsoleContext from '@alicloud/console-context';

consoleContext.consoleConfig

consoleContext.region
```

### React Context 用法

```javascript
import { withConsoleConfig, ConsoleContext } from '@alicloud/console-context';

const App = withConsoleConfig(
  (props) => {
    const { region, consoleConfig } = useContext(ConsoleContext);
    return (<>
      <div>{region.getCurrentRegionId()}</div>;
      <div>{consoleConfig.getChannel()}</div>;
    </>)
  }
);
```

## OneConsole

在 ```consoleContext.consoleConfig``` 中封装了和控制台配置打交道的部分，包括了当前用户，当前渠道，当前灰度等等，具体 API 参考如下:

#### consoleContext.isCertified()

获取用户实名认证状态

#### consoleContext.getChannel()

获取用户当前渠道

#### consoleContext.getfEnv()

获取用户当前

#### consoleContext.getLang()

获取当前用户语言

#### consoleContext.getLocale()

获取当前用户语言

#### consoleContext.getAccoutLoginLink()

获取当前登录地址

#### consoleContext.getSecToken()

获取 secToken 用户防止 csrf 攻击

#### consoleContext.getAccountName()

获取当前用户名

#### consoleContext.getMainAccountPK()

获取当前用户主账号 PK， 主要用于 Ram User 的主账号获取

#### consoleContext.getCurrentPK()

获取当前用户账号 PK。

#### consoleContext.getAccountType()

获取当前账号的账号类型，主账号，子账号，STS。

#### consoleContext.getOpenStatus(code: string)

获取某个产品的开通状态

#### consoleContext.getGrayStatus(grayId: string)

获取某个产品的开通状态

#### consoleContext.getChannelFeature(featureId: string)

获取某个产品的开通状态

#### consoleContext.getChannelLink(linkId: string)

获取某个产品的开通状态

#### consoleContext.getLabel()

获取某个用户当前账号上的标签

#### consoleContext.getUserPreference()

获取当前用户设置偏好

#### consoleContext.getRuleConfig()

获取当前规则中心的信息

#### consoleContext.getRegions()

获取当前 location 中配置的信息

#### consoleContext.getStaticAPI(field: string)

获取 Viper 中配置的 staticAPI 配置的信息

## Region

#### onRegionChange

监听 RegionBar 上 Region 变更的事件

#### toggleRegion()

触发 RegionBar 的显示移仓

#### setRegionId

设置 RegionBar 的 RegionId

#### setRegions

设置 RegionBar 上的 Region 列表

#### setRegionResourceCount

设置 RegionBar 上的 每个 Region 中的数字

#### getCurrentRegionId

获取当前的 RegionId

## React Utils

#### ChannelLink

```javascript
<ChannelLink id="linkId" />
```

#### Gray

```jsx
<Gray id="grayId" >
  <div> hello world </div>
</Gray>
```
#### ChannelFeature

```jsx
<ChannelFeature id="featureId" >
  <div> hello world </div>
</ChannelFeature>
```