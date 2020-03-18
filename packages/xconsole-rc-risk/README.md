# @ali/wind-rc-risk

控制台风控组件

## Installation

```
tnpm i -S @ali/wind-rc-risk
```

## Peer Dependencies

使用风控组件必须依赖以下的 package ，在使用之前请更新你的依赖库

- react `^16.4.2`

  从 react@15.x 升级到 react@16.x 并不会有实质性的 BREAK CHANGE ，请放心升级

- dva `^2.x` | dva-react-router-3 `latest`

  dva/dva-wind 由于使用了较老版本的 react-router ，导致 PropTypes 报错，请更新到最新版本的 dva 或者 dva-react-router-3

- dva-loading `latest`

  由于风控组件中使用了 dva-loading 来管理请求状态，请安装 dva-loading 以获得最佳的用户体验

## Quick Start

### 注册风控组件的 model

**src/app.js**

```
import { model as riskModel } from '@ali/wind-rc-risk'
...
app.model(riskModel)
```

### 部署风控组件

**src/routes/App/index.js**

> 或其他应用根节点组件，只要确定在应用生命周期内该节点不会被 unmount 即可，**只需要部署一次**
>

```
import Risk from '@ali/wind-rc-risk'
...

const App = () => (
  <div>
    <Risk />
    ...
  </div>
)
```

### 封装需要进行风控的接口

当使用 `@ali/wind-service` 类库时，使用 `createService` 创建的接口在请求时，如果触发风控，都会抛出一个特殊的 Error

`@ali/wind-rc-risk` 中的 `capture` 函数用于封装一个请求函数，并在其抛出对应 Error 的时候捕获并触发风控流程

```
import { capture } from '@ali/wind-rc-risk'
...

const deleteInstanceWithRisk = capture(deleteInstance)
```

### 自定义错误捕获

如果你没有使用 `@ali/wind-service` 创建请求接口，请自行封装自己的请求函数，在触发风控的时候抛出一个可以被识别的 Error

```
const yourService = async (options) => {
  await resp = axios(options)
  if (resp.data.code === 'FoundRiskAndDoubleConfirm') {
    const err = new Error('FoundRiskAndDoubleConfirm')
    err.isRiskError = true
    throw err
  }

  return resp
}
```

`capture` 函数的第二个参数可以对错误进行自定义捕获

```
const withRiskService = capture(yourService, {
  isRiskError(err) {
    return err.isRiskError
  },
})
```

在以短信和邮件方式二次验证时，需要向对应的客户端发送验证码，发送验证码时可能会发生错误，`capture` 会捕获对应错误并渲染错误信息。与 `isRiskError` 类似，你可以对该错误进行特征识别

```
const withRiskService = capture(yourService, {
  isVerifyCodeError(err) {
    return err.isVerifyCodeError
  },
})
```

在自定义的请求返回风控数据后，你还需要将风控数据映射到风控组件上

```
const withRiskService = capture(yourService, {
  mapRiskErrorToActionPayload(err) {
    const {
      response: {
        codeType,
        mteeCode,
        verifyDetail,
        verifyType,
      } = {},
    } = err

    return {
      type: verifyType,
      detail: verifyDetail,
      codeType,
      mteeCode,
    }
  },
})
```

在 effects 里调用已经被 capture 处理过的异步调用函数

```
export default {
  effects: {
    doSomething: function* ({ payload }, { call }) {
      const result = yield call(withRiskService, payload)
    },
  },
}
```


### 高级应用

由于 capture 是一个函数，请尽开脑洞创建属于你自己的封装

## APIs

You don't need this



