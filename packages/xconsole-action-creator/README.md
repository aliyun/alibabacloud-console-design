# @alicloud/xconsole-action-creator

内部包，被 `@alicloud/xconsole-model` 依赖

## APIs

### createActions(model[, actionMap])

创建 actionMap，内部使用

```js
const actions = createActions(dvaModel);

// actions[actionName](payload, meta);
// return
// {
//   [actionName]: {
//     type: `${namespace}/${actionName}`,
//     payload,
//     meta
//   } 
// }
```