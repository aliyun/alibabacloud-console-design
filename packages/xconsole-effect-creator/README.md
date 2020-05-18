# @alicloud/xconsole-effect-creator

> 被 `@alicloud/xconsole-model` 依赖

```js

export const takeLatest = fn => ([fn, { type: 'takeLatest' }])

export const throttle = (fn, ms) => ([fn, { type: 'throttle', ms }])

export const watcher = fn => ([fn, { type: 'watcher' }])

```