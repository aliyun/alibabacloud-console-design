# @alicloud/xconsole-model

> 用 dva 实现的数据层

## APIs

### ModelContext

model 上下文

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|attach|`function`||注册 `model` 并返回当前 `model`|
|detach|`function`||注销 `model`|
|models|`Object`||`key` 为 `namespace`，`value` 为 `model`|

每一个 `model` 注册时都会使内部计数+1，注销时会使内部计数-1，只有当计数为 0 时，才会真正的销毁这个 `model`

```js
const { attach, detach, models } = useContext(ModelContext);

// attach(dvaModel)
// return
// {
//   namespace,
//   action,
//   selectors,
// }
```

### ModelProvider

通过 `ModelContext` 向子组件传递 `attach` `detach` 方法和 `models` 属性

```js
const App = () => {
  return <ModelProvider>
    {
      //...
    }
  </ModelProvider>
}
```

### model(opt)

返回一个 `dvaModel`，用于 `@alicloud/xconsole-query`

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|opt|`Object`|||
|opt.service|`function`||异步请求，返回数据|
|opt.initialValue|`Object`||`modal.state.Result` 初始值|

```js
import { model } from '@alicloud/xconsole-model';

const GetInstancesModel = model({
  service: async (variables) => {
    const result = await createService('vpc'， 'DescribeVpcs')(variables)
    return result
  },
  initialValue: {}
});

// return
// GetInstanceModel = {
//   namespace: uuid(),
//   reducers: { save }
//   effects: { action },
//   subscriptions: {},
//   selectors: { result, error }
// }
```

### ListModel

为列表场景设计的 model

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|props.fetch|`function`||异步请求，返回 `Promise`|

```js
const App = () => {
  return <ListModel fetch={}>
    {
      () => {
        const { actions, selectors } = useContext(ModelContext);
        return null;
      }
    }
  </ListModel>
}
```

`actions` 参见 `@alicloud/xconsole-action-creator`

### FormModel

为表单场景设计的 model

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|props.fetch|`function`||异步请求，返回 `Promise`|

```js
import { useContext } from 'react';
import { FormModel, ModelContext } from '@alicloud/xconsole-model';

const App = () => {
  return <FormModel fetch={}>
    {
      () => {
        const { actions, selectors } = useContext(ModelContext);
        return null;
      }
    }
  </FormModel>
}
```

### InfoModel

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|props.fetch|`function`||异步请求，返回 `Promise`|

```js
import { useContext } from 'react';
import { FormModel, ModelContext } from '@alicloud/xconsole-model';

const App = () => {
  return <InfoModel fetch={}>
    {
      () => {
        const { actions, selectors } = useContext(ModelContext);
        return null;
      }
    }
  </InfoModel>
}
```

## Usage

XConsole 在入口已经加载了 `XConsoleProvider`，实际使用中不需要再引入 `@alicloud/xconsole-context` 了

```js
import { XConsoleProvider, XConsoleContext } from '@alicloud/xconsole-context';

const App = () => {
  return (
    <XConsoleProvider>
      <InfoModel fetch={}></InfoModel>
      <FormModel fetch={}></FormModel>
      <ListModel fetch={}></ListModel>
    </XConsoleProvider>
  )
}
```

