# @alicloud/xconsole-mutation

> Mutation 组件提供更新数据的能力，一般和 Query 组件一起使用

## APIs

### Mutation

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|mutation|`XConsoleModel`||封装后的 model 对象|
|refetchQuery|`function`|||
|onCompleted|`function`||请求完成回调|
|onError|`function`||请求错误回调|

## Usage

```js
import { Mutation } from '@alicloud/xconsole'

const App = () => (
  <Mutation
    mutation={CreateInstanceModel}
    onCompleted={data => {}}
    onError={error => {}}
    refetchQuery={() => [
      // 在完成请求后，会去更新 refetchQuery 返回的 queryList
      { query: GetInstancesModel, variables: { regionId: "cn-hangzhou" } }
    ]}
  >
    {
      (action, { data, loading, error }) => (
        //...
      )
    }
  </Mutation>
);
```

