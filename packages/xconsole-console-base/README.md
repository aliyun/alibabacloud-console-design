# @alicloud/xconsole-console-base

> 负责与 ConsoleBase 进行通信的内核模块

当出现以下两种情况时，通知 topBar 更新 regionList

* 路由改变
* message event 监听到 region 变化

## Usage

```js
import XconsoleConsoleBase from '@alicloud/xconsole-console-base';

const App = () => {
  return (
    <div>
      <XconsoleConsoleBase />
    </div>
  );
};
```

