# @alicloud/xconsole-service

> service，基于 axios 的业务封装

## APIs

### createService(product[, action], options)

创建一个 axios 实例

```js
const defaultOptions = {
  apiType: 'open',
  ignoreError: false,
  description: null,
  useCors: false,
  risk: {
    code: {
      success: '200',
      doubleConfirm: 'FoundRiskAndDoubleConfirm',
      forbidden: 'FoundRiskAndTip',
      verifyCodeInvalid: 'verifyCodeInvalid',
    },
    url: {
      generateVerificationCode: '/risk/sendVerifyMessage.json',
      setVerificationMethod: 'https://account.console.aliyun.com/#/secure',
      changeVerificationMethod: 'https://account.console.aliyun.com/#/secure',
      bindMobileHelp: 'https://account.console.aliyun.com',
    },
  }
}
```

```js
createService('', '', defaultOptions)({ /* params */ }, true);
```
### createApiClient(options)

创建 openApiService innerApiService appApiService

```js
createApiClient({
  ignoreError: false,
  risk: {
    code: {
      // ...
    },
    url: {
      // ...
    }
  }
});

// return
// {
//   request, // open api service
//   innerApi, // inner api service
//   callApi // app api service
// }
```
