# @alicloud/xconsole-rc-feature

> 功能开关组件，能根据 Viper 的功能状态控制内容的展示和隐藏。

## APIs

### Feature

| Param | Type | Default | Description |
|--------|------|---------|-------------|
|id|`string`||灰度 id|
|region|`string`||传递要检查的 region，不传则不会检查 region 是否在白名单内|

## Usage

```js
import Feature from '@alicloud/xconsole-rc-feature';

<Feature id="feature.cors.enable">
  <Component />
</Feature>
```

