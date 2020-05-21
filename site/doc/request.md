---
name: request
zhName: 请求后端接口
sort: 7
---

# 请求后端接口

## 使用 Query 获取数据

`Query` 组件提供了直观，透明的数据获取能力，通过传入数据模型和请求参数，就会把数据通过 render prop 的方式提供给 UI 组件，示例如下：

```js
import { Query, model } from '@alicloud/xconsole'
import { createService } from '@alicloud/xconsole-service'

const GetInstances = model({
  service: async (variables) => {
    const result = await createService('ProductName'， 'GetInstances')(variables)
    return result
  }
})

export default () => (
  <Query
    query={GetInstances}
    variables={{ regionId: 'cn-hangzhou' }}
  >
    {
      ({ data, loading, error }) => <Table dataSource={data} />
    }
  </Query>
)
```

### 重新获取数据
当需要重新获取数据的时候，比如刷新或者搜索，Query 提供了简便的 refetch 方式：

```js
export default () => (
  <Query
    query={GetInstances}
    variables={{ regionId: 'cn-hangzhou' }}
  >
    {
      ({ data, loading, error, refetch }) => (
	    <Fragment>
		  <Table dataSource={data} />
		  <Button onClick={() => refetch()}>刷新</Button>
		</Fragment>
	  )
    }
  </Query>
)
```
`refetch` 支持传入 `variables`，这部分参数和会从 Query props 传入的 `variables` 合并后保存在组件内部，直到 Query props 的 `variables` 发生改变，所以搜索和翻页功能也可以通过 `refetch` 实现。

### 触发事件回调
`Query` 支持配置 `onCompleted (data | {}) => void ` 和 `onError (error) => void` 两个回调，分别在数据请求成功和请求报错时触发，可以用来实现一些独有的业务逻辑。

## 使用 Mutation 变更数据
与 `Query` 相对，`Mutation ` 提供了数据变更的能力。示例代码如下：

```js
const CreateInstance = model({
    service: async (variables) => {
      const result = await createService('ProductName', 'CreateInstance')(variables)
      return result
    }
  })

  export default () => (
    <Mutation mutation={CreateInstance}>
      {
        (create, { data, loading }) => <Form onSubmit={() => create()} />
      }
    </Mutation>
  )
```

### 与 Query 的联动
`Mutation` 提供了一个非常好用的参数 `refetchQuery`，支持配置一个函数 `(result) => ({ query, variables})`，在数据变更请求成功，所有使用了 query 的 `Query` 组件都会自动更新数据，当我们需要在非父子组件中间做数据联动时会很方便。

```js
export default () => (
  <Fragment>
    <Query
      query={GetInstances}
      variables={{ regionId: 'cn-hangzhou' }}
    >
      {
        ({ data, loading, error }) => <Table dataSource={data} />
      }
    </Query>
    <Mutation 
      mutation={CreateInstance}
      refetchQuery={() => ({ query: GetInstances, variables: { regionId: 'cn-hangzhou' } })}
    >
      {
        (create, { data, loading }) => <Form onSubmit={() => create()} />
      }
    </Mutation>
  </Fragment>
)
```

### 触发事件回调
`Mutation` 同样支持配置 `onCompleted (data | {}) => void ` 和 `onError (error) => void` 两个回调。
