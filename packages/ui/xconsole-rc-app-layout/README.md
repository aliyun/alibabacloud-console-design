# @alicloud/xconsole-base-service

> XConsole 请求包，基于 axios 封装

## Usage
```js
import axios, { service, createService, getUploadSignature, createDefaultAxiosInstance } from '@alicloud/xconsole-base-service';
```

## APIs

### axios
[axios usage](https://github.com/axios/axios)

### service([data[, config]])

创建一个 service 实例

|Param|Type|DefaultDescription|
|-----|----|-----------|
|data |`object`||
|config|`object`||

```js
await service({
  action: 'product1',
  product: 'action1',
  params: {
    RegionId: 'cn-hangzhou',
    InstanceId: 'xxx-142534'
  },
}, {
  ignoreError: '',
  data: configData = {},
  params: configParams = {},
  axiosInstance: null,
  requestConfig: {
    url: '' // required
  }
});
```

### createService(product, action[, transformConfig])

柯里化实现的 service 工厂函数

|Param|Type|Description|
|-----|----|-----------|
|product|`string`||
|action|`string`||
|transformConfig|`function(config)`|修改 config |

```js
const customService = createService(product, action, transformConfig);

customService(params, config);
```

### getUploadSignature(bucketName, region, objectName[, options])

获取上传接口签名

|Param|Type|Description|
|-----|----|-----------|
|bucketName|`string`||
|region|`string`||
|objectName|`string`||
|options|`object`|`{ extra: {}, ignoreError: false }` extra => axios requestConfig|

```js
const sign = getUploadSignature('bucketName', 'cn-hangzhou', 'objectName', {
  extra: {},
  ignoreError: false
})
```

### createDefaultAxiosInstance([instanceConfig])

创建一个 axios 实例

|Param|Type|Description|
|-----|----|-----------|
|instanceConfig|`object`|axios config|

```js
const ins = createDefaultAxiosInstance({
  headers: {},
  //...
});

// ins has axios instance methods
ins.request({
  url: '/your/path', // required
  method: 'get',
  params: {}
});
```
