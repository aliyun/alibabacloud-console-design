@alicloud/xconsole-rc-error-prompt
====

[see in action](https://wind.alibaba-inc.com/playground/detail/5658e35d662c6c83fa2bb9e46dfa8fe1)

# 安装

```
tnpm install @ali/builder-abc -g;
tnpm i --save prop-types react react-dom @alife/next @alicloud/xconsole-rc-dialog @alicloud/xconsole-rc-error-prompt
```

`@alicloud/xconsole-rc-error-prompt` 之前的是它的依赖，需要使用者安装（包括 JS 和 CSS）。

## 你自己的 `alert-error`

`@alicloud/xconsole-rc-error-prompt` 是一个工厂方法，它不知道错误的 code、message，请求相关的 method、url、params、body、requestId 等的任何信息，需要你告诉它。

比如你在项目的 `src/util/` 下建如下一个目录：


```text
src/
 └─ util/
     └─ alert-error
        ├─ index.js
        └─ index.less
```

### index.less

```less
@import (inline) '~@alicloud/xconsole-rc-dialog/dist/index.css'; // 如果你已经安装了且在别处引了它的样式，这行可以不要
@import (inline) '~@alicloud/xconsole-rc-error-prompt/dist/index.css';
```

### index.js

```js
import _get from 'lodash/get';

import errorPrompt from '@alicloud/xconsole-rc-error-prompt';

// 注意以下几行 import 是假的，你需要用你自己的本地代码替换之
import intl from ':intl'; // 绝对不要用硬编码的字符串
import confGet from ':conf/get'; // 用于获取当前应用的 locale 等
import { // 你可能需要一个地方维护你关心的错误码或错误名常量
  ERROR_NAME,
  ERROR_CODE
} from ':const/error';

import './index.less';

export default errorPrompt({
  locale: confGet('LOCALE'),
  messages: {},
  ignoredParamKeys: [],
  ignoreBodyKeys: [],
  shouldIgnore(err) {
    return err.code === ERROR_CODE.CAN_BE_IGNORED;
  },
  getTitle(err) {
    if (err.name === ERROR_NAME.SIGN_IN || err.code === ERROR_CODE.SIGN_IN) {
      return intl('sign_in.title');
    }
  },
  getMessage(err) {
    if (err.code === ERROR_CODE.CHANGE_MESSAGE) {
      return intl('error_message.code_xx');
    }
  },
  getConfirm(err) {
    if (err.name === ERROR_NAME.SIGN_IN || err.code === ERROR_CODE.SIGN_IN) {
      return intl('sign_in.confirm');
    }
  },
  // 为了能够展示请求错误，下面这些方法你需要设定，不设定将不会有「详情」可以看
  getRequestId(err) {
    return _get(err, '_fetch.requestId');
  },
  getRequestUrl(err) {
    return _get(err, '_fetch.url');
  },
  getRequestMethod(err) {
    return _get(err, '_fetch.method');
  },
  getRequestParams(err) {
    return _get(err, '_fetch.params');
  },
  getRequestBody(err) {
    return _get(err, '_fetch.body');
  },
  getRequestExtra(err) {
    return {
      EXTRA1: _get(err, '_fetch.extra1'),
      EXTRA2: _get(err, '_fetch.extra2')
    };
  },
  onConfirm(err) {
    if (err.name === ERROR_NAME.SIGN_IN || err.code === ERROR_CODE.SIGN_IN) {
      window.location.reload();

      return false;
    }
  }
});
```

## 直接使用

```js
import alertError from ':util/alert-error';

// 在有必要的时候
someAction().catch(alertError);
```

## 作为 dva-plugin

因为实在是太少的代码，所以没有抽成组件的一部分，而是需要调用者自己简单封装一下。

**src/plugin/error.js**

```js
import alertError from ':util/alert-error';

export default {
  onError(err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[error plugin]', err); // eslint-disable-line no-console
    }

    return alertError(err);
  }
};
```

**src/app.js**

```js
import pluginError from ':plugin/error';

app.use(pluginError);
```

# 参数说明

注意：

* 所有的参数均为可选
* 所有的 `getXx` 方法在无返回或 return 空的情况下都会回退到兜底默认值

参数名 | 类型 | 默认 | 说明
:-- | :-- | :-- | :--
`locale` | `string` | `'en-US'` |
`messages` | `object` | - |
`ignoredParamKeys` | `array<string>` | `[]` | 当错误为请求错误，且有 URL 参数，可以配置其中哪些参数可以不被展示（比如防缓存参数等）
`ignoredBodyKeys` | `array<string>` | `['token', 'secToken', 'collina']` | 当错误为请求，且有请求 body，可以配置其中哪些部分不被展示（比如自动填充的安全参数等）
`requestIdPriorToCode` | `boolean` | `false` | 「错误详情」按钮中优先展示 `requestId`，默认展示的是 `code`
`shouldIgnore` | `function` | `noop` | 默认将忽略所有「空」错误，也可以通过它忽略一些已经得到妥善处理的错误（比如风控阻止和取消）
`getTitle(error, details)` | `function` | `noop` | 根据 error 对象改自定义的 title，否则用默认 title
`getConfirm(error, details)` | `function` | `noop` | 根据 error 对象改自定义的 confirm 按钮的 label
`getCancel(error, details)` | `function` | `noop` | 根据 error 对象改自定义的 cancel 按钮的 label
`getMessage(error, details)` | `function` | `noop` | 从 error 中获得 message（可以通过它对一些需要特殊照顾的错误进行消息改写）
`getCode(error)` | `function` | `noop` | 从 error 中获得错误码
`getRequestId(error)` | `function` | `noop` | 从 error 中获取 requestId
`getRequestMethod(error)` | `function` | `noop` | 从 error 中获取请求 method
`getRequestUrl(error)` | `function` | `noop` | 从 error 中获取请求 URL（如果 url 带参数，会自动将参数与下面的 params 进行合并，url 永远展示无参数的形式）
`getRequestParams(error)` | `function` | `noop` | 从 error 中获取请求的 URL 参数（会和 url 中参数合并），可以返回字符串或对象，字符串会通过 `qs.parse` 进行解析
`getRequestBody(error)` | `function` | `noop` | 从 error 中获取请求 body，可以返回字符串或对象，字符串会通过 `qs.parse` 进行解析
`getRequestExtra(error)` | `function` | `noop` | 从 error 中获取额外的信息，返回对象，会和其他的 request 信息一起展示
`onConfirm(error)` | `function` | `noop` | 弹错框按「确定」关闭的时候将对所有正在提示的错误进行此回调，如果任何一个回调中返回 false，则会中断后边的回调，比如 `window.location.reload()` 之后就没有必要继续回调了
`onCancel(error)` | `function` | `noop` | 同上，只是弹错框的关闭是按「取消」或「X」或「ESC」

## getRequestXx

`getRequestId`、`getRequestMethod`、`getRequestUrl`、`getRequestParams`、`getRequestBody`、`getRequestExtra` 这些方法得到的结果将组成如下对象：

```js
{
  request_id: string;
  method: string;
  url: string;
  params: object;
  body: object;
}
```

这个对象将回传给 `getTitle`、`getConfirm`、`getCancel`、`getCode`、`getMessage` 作为它们的第二个参数，以便需要的时候可以从里边拿需要的数据（注意 `details` 需要判空）。

# FAQ

## 没有样式？

是不是忘记引入 CSS？你需要在适当的位置引入依赖的 CSS。

注意，如果你没有安装 [@alicloud/xconsole-rc-dialog]，你需要安装它，并在你适当的位置引它的样式。

你需要引入至少以下两个样式文件：

```less
@import (inline) '~@alicloud/xconsole-rc-dialog/dist/index.css';
@import (inline) '~@alicloud/xconsole-rc-error-prompt/dist/index.css';
```

强烈推荐用 [@alicloud/xconsole-rc-dialog] 来替换 fusion 的 dialog 以及 [SlidePanel](https://wind.alibaba-inc.com/components/biz/wind-rc-slide-panel)。

## 没有详情？

你需要实现以下方法：

* `getRequestId(err)`
* `getRequestUrl(err)`
* `getRequestMethod(err)`
* `getRequestParams(err)`
* `getRequestBody(err)`
* `getRequestExtra(err)`

## 自定义标题、按钮、展示信息

实现以下方法

* `getTitle(err, details)`
* `getConfirm(err, details)`
* `getCancel(err, details)`
* `getMessage(err, details)`

任何问题直接找 @驳是。

[@alicloud/xconsole-rc-dialog]: https://npm.alibaba-inc.com/package/@alicloud/xconsole-rc-dialog
