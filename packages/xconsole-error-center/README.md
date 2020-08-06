# xconsole-error-center

> a wind library


## Usage

* use in `appConfig.js`

```js
config.errorCenter = {
  enable: true,  // 全局配置，配置为 false 的话，所有异常都不会被 ErrorCenter 处理
  errorCodes: {
    ConsoleNeedLogin: {
      enable: false, // 默认 true
      type: "prompt", // 错误展示类型，默认 prompt
      // 以下都是传递给 prompt 的配置信息
      title: 'Error Title', // 弹窗标题，默认获取 intl(errorCode)，例如 intl(ConsoleNeedLogin)
      message: '登录失效，请重新登录', // 弹窗信息，默认值为 error.message
      // message: (error) => 'you want string', 
      confirmLabel: '重新登录', // 确定按钮文案
      confirmHref: 'https://aliyun.com', // 点击确定跳转的链接
      cancelLabel: '留在页面', // 取消按钮文案
      cancelHref: 'https://aliyun.com', // 点击取消跳转的链接
      i18nMessages: {}
    },
    PostonlyOrTokenError: (err) => {
      // 也可以使用为错误码配置 callback，errorCenter 会优先使用传递的 callback 处理异常
      window.loaction.reload();
    }
  },
  include: ['ConsoleNeedLogin', 'PostonlyOrTokenError'], // include 只有配置才生效
  exclude: [], // include 存在时 exclude 无效
  globalErrorCode: { // 未命中 errorCodes 中的配置时默认使用的全局处理配置或方法
    enable: false, // 默认 true
    type: "prompt", // 错误展示类型，默认 prompt
    // 以下都是传递给 prompt 的配置信息
    title: 'Error Title', // 弹窗标题，默认获取 intl(errorCode)，例如 intl(ConsoleNeedLogin)
    message: '登录失效，请重新登录', // 弹窗信息，默认值为 error.message
    // message: (error) => 'you want string', 
    confirmLabel: '重新登录', // 确定按钮文案
    confirmHref: 'https://aliyun.com', // 点击确定跳转的链接
    cancelLabel: '留在页面', // 取消按钮文案
    cancelHref: 'https://aliyun.com', // 点击取消跳转的链接
    i18nMessages: {}
  }
  // globalErrorCode: (error, code) => {}
};
```

* use `ErrorPrompt`
```js
import { ErrorPrompt } from '@alicloud/xconsole-error-center';

ErrorPompt(error, {
  // 以下都是传递给 prompt 的配置信息
  title: 'Error Title', // 弹窗标题，默认获取 intl(errorCode)，例如 intl(ConsoleNeedLogin)
  message: '登录失效，请重新登录', // 弹窗信息，默认值为 error.message
  // message: (error) => 'you want string', 
  confirmLabel: '重新登录', // 确定按钮文案
  confirmHref: 'https://aliyun.com', // 点击确定跳转的链接
  cancelLabel: '留在页面', // 取消按钮文案
  cancelHref: 'https://aliyun.com', // 点击取消跳转的链接
  i18nMessages: {}
})
```