# @alicloud/xconsole-rc-base-link

链接

## 基本用法
#include "demo/basic.js"
#include "demo/basic.less"

## APIs

### Link

| Param | Description | Type | Default |
|--------|-------------|------|---------|
|shape|链接显示为何种形态，默认为显示为普通链接 ``text``，也可以显示为按钮 ``button``|``string``|``'text'``|
|type|强调类型，目前只在 ``shape="button"`` 时生效，可选值为 ``normal``（默认） ``primary`` ``secondary``|``string``|``'normal'``|
|size|尺寸，目前只在 ``shape="button"`` 时生效，可选值为 ``medium`` ``small`` ``large``|``string``|``'medium'``|
|disabled|是否禁用|`boolean | function`|``false``|
|visible|是否显示|`boolean | function`|``true``|
|relative|如果是相对路径，将会修改 `to` 为 relativePath|`boolean`||
|other|参考 [react-router/api/Link](https://reacttraining.com/react-router/web/api/Link)|
