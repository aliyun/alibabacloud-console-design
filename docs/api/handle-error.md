# 通用错误处理

在 ./src/appConfig.ts 中增加以下配置

``` javascript
import { ErrorCenterOption } from '@ali/xconsole/types'

// or 静态配置
config.errorCenter: ErrorCenterOption = {
  enable: true, // 配置为 false 的话不会出现报错弹窗
  errorCodes: {
    ConsoleNeedLogin: {
      title: "Error Title", // 弹窗标题
      message: "登录失效，请重新登录", // 弹窗信息，默认值为 error.message
      confirmLabel: "重新登录", // 确定按钮文案
      confirmHref: "https://aliyun.com", // 点击确定跳转的链接
      cancelLabel: "留在页面", // 取消按钮文案
      cancelHref: "https://aliyun.com" // 点击取消跳转的链接
    }
  }
};

// or 动态配置

config.errorCenter: ErrorCenterOption = {
  enable: true, // 配置为 false 的话不会出现报错弹窗
  errorConfig: (error: ResponseError) => {
    return  {
      title: "Error Title", // 弹窗标题
      message: "登录失效，请重新登录", // 弹窗信息，默认值为 error.message
      confirmLabel: "重新登录", // 确定按钮文案
      confirmHref: "https://aliyun.com", // 点击确定跳转的链接
      cancelLabel: "留在页面", // 取消按钮文案
      cancelHref: "https://aliyun.com" // 点击取消跳转的链接
    }
  }
};

export default config;
```

当 OpenAPI 报错时会出现如下报错弹窗

![](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/46140/1571390229245-77e55093-a039-4207-9b73-07fb3ea7c0d4.png)


ErrorCenterOption 的全量配置

```typescript
interface ErrorCenterOption {
  // 是否开启全局接口报错
  enable?: boolean;
  // 接口对于每个接口错误码的配置项
  errorCodes?: ErrorCodeConfigMap | ErrorConfigCallback;
  // 动态接口
  errorConfig?: (error: ResponseError) => ErrorCodeConfig;
  // 全局处理 报错文案的地方
  getMessage?: (code: string, msg: string, error: ResponseError) => string;
};
```
```ErrorCodeConfigMap``` 是 错误码 到 ```ErrorCodeConfig``` 对象的映射

```typescript
interface ErrorCodeConfigMap {
  [key: string]: Partial<ErrorCodeConfig>
};

interface ErrorCodeConfig {
  // 弹窗标题
  title: string;
  // 弹窗信息，默认值为 error.message
  message: string | (error: Error) => string;
  // 确定按钮文案
  confirmLabel: string;
  // 点击确定跳转的链接
  confirmHref: string;
  // 取消按钮文案
  cancelLabel: string;
  // 点击取消跳转的链接
  cancelHref: string;
}
```

注意: 接口报错的弹窗只会出现在 Query, Mutation 以及 useXXXApi 的 Hooks 中报错，如果是自己通过 createService 的 请求，无法被捕获。


如果希望自己手动调用错误弹窗请使用

```typescript
import { ErrorPrompt as errorPrompt } from '@ali/xconsole/utils';

errorPrompt({
  error,
  { 
    errorConfig: {
      message,
      confirmLabel,
      cancelLabel,
      cancelHref,
      confirmHref
    },
    dialogType,
    disableExtraInfo,
  }
});
```