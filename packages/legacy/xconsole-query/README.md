# @alicloud/xconsole-query

> Query 组件提供获取数据的能力

## APIs

### Query

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|query|`XConsoleModel`||封装后的 model 对象|
|variables|`object`||请求参数|
|onCompleted|`function`||请求完成回调|
|onError|`function`||请求错误回调|

## Usage

```js
import { Query } from '@alicloud/xconsole'

const App = () => (
  <Query
    query={GetInstancesModel}
    variables={{ regionId: 'cn-hangzhou' }}
    onCompleted={(data) => {}}
    onError={(error) => {}}
  >
      {
        ({ data, loading, error, refetch, variables }) => (
          //...
        )
      }
  </Query>
);
```
### refetch(newVars: object, useOldVars: boolean) 支持传入两个参数：

`newVars` 这部分参数和会从 Query props 传入的 `variables` 合并后保存在组件内部，直到 Query props 的 variables 发生改变，所以搜索和翻页功能也可以通过 refetch 实现。

`useNewVars` 默认值为false；当为 true 时，表示不与从 Query props 传入的 `variables` 合并, 而直接使用 newVars 参数；

