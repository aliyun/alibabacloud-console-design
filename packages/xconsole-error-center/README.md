# @alicloud/xconsole-error-center

> 统一错误处理，提供了针对不同错误码的报错信息配置

## APIs

### ErrorCenter({ errorCenter })

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|errorCenter|`object`|||
|errorCenter.enable|`boolean`|`false`|是否出现报错弹窗|
|errorCenter.errorCode|`errorCode`|
|errorCenter.errorCodes|`errorCode[]`|

### ErrorPrompt(err, { errorConfig })

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|err|`Error`||see [Handling Errors](https://github.com/axios/axios)|
|errorConfig|`errorCode[] | errorCode`|||

## Usage

```js
import ErrorCenter from '@alicloud/xconsole-error-center';

ErrorCenter({ {
  enable: true, // 配置为 false 的话不会出现报错弹窗
  errorCode: {
    ConsoleNeedLogin: {
      title: "Error Title", // 弹窗标题
      message: "登录失效，请重新登录", // 弹窗信息，默认值为 error.message
      confirmLabel: "重新登录", // 确定按钮文案
      confirmHref: "https://aliyun.com", // 点击确定跳转的链接
      cancelLabel: "留在页面", // 取消按钮文案
      cancelHref: "https://aliyun.com" // 点击取消跳转的链接
    }
}});
```

