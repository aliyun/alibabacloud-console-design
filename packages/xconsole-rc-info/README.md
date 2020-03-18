# @ali/wind-rc-info

信息展示

## 基本用法
#include "demo/basic.js"
#include "demo/basic.less"

## BREAKCHANGE

- `<Info>` 组件本身不再负责数据展示，从而专注于规范化的布局和排版。数据展示交由 `<List>` 组件进行处理
- `id` 属性被移除
- `loading` 属性暂时被移除

## APIs

### Info

|参数|说明|类型|必填|默认值|
|---|---|---|---|---|
|title|标题|``Node``|||
|extra|附加功能区域|`Node`|||
|className|自定义样式|`String`|||
|style|自定义样式|`Object`|||

### Info.Title

|参数|说明|类型|必填|默认值|
|---|---|---|---|---|
|value|标题|`Node`|||
|extra|附加功能区域|`Node`|||
|childrenAlign|子组件对齐方式|`String('left'|'right')`|||
|className|自定义样式|`String`|||
|style|自定义样式|`Object`|||

### Info.Content

|参数|说明|类型|必填|默认值|
|---|---|---|---|---|
|className|自定义样式|`String`|||
|style|自定义样式|`Object`|||