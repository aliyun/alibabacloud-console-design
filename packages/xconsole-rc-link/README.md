# @alicloud/xconsole-rc-link

> 基于 `xconsole-rc-base-link` 封装的渠道组件，配合 `xconsole-console-base-context` 使用

## APIs

### XConsoleRcLink

| Param | Type | Default | Description |
|--------|------|---------|-------------|
|linkId|`string`||根据渠道Id获取渠道地址|
|linkParams|`object`||渠道参数变量，用于生成动态的渠道地址|
|pure|`boolean`|`false`|是否只返回渠道地址，默认返回 Link 组件|
|restProps|||参考 xconsole-rc-base-link 的 props|

## Usage

```js
import { XConsoleRcLink } from '@alicloud/xconsole-rc-link';

const Link = () => {
  return (
    <ConsoleBaseProvider>
      <XConsoleRcLink linkId="" linkParams={}>
        标题
      </XConsoleRcLink>
    </ConsoleBaseProvider>
  )
}
```

在 xconsole 中已经在入口处引入了 ConsoleBaseProvider，不需要开发者再手动引入了