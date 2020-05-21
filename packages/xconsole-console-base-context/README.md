# @alicloud/xconsole-console-base-context

> 获取 console-base 配置数据

## 配置枚举
```ts
enum CONFIG {
  links = 'CHANNEL_LINKS', // 渠道链接
  features = 'CHANNEL_FEATURE_STATUS', // 渠道开关
  gray = 'FEATURE_STATUS', // 功能灰度
  mainAccountPK = 'MAIN_ACCOUNT_PK', // 当前登录用户的主账号PK
  currentPK = 'CURRENT_PK', // 当前登录用户的PK
  accountType = 'ACCOUNT_TYPE', // 当前登录用户的类型，包括main，sub, sts
  accountName = 'ACCOUNT_NAME', // 子账号名称
  openStatus = 'OPEN_STATUS', // 服务开通状态
  locale = 'LOCALE', // 多语言
  regions = 'REGIONS', // 多语言
}
```

## Usage

```js
import { ConsoleBaseContext, ConsoleBaseProvider } from '@alicloud/xconsole-console-base-context';

const Child = () => {
  const config = React.useContext(ConsoleBaseContext);

  return null;
}

const Parent = () => {
  return <ConsoleBaseProvider>
    <Child />
  </ConsoleBaseProvider>
};
```

