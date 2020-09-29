# @alicloud/xconsole-logger

> 页面路由更新时，上报埋点

## APIs

### XConsoleLogger

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|config|`object`|||
|routeConfig|`object`|||
|history|`object`||react-router history|

## Usage

```js
import XconsoleLogger from '@alicloud/xconsole-logger';

const App = () => {
  return (
    <>
      <XconsoleLogger
        config={{ spma: '' }}
        routeConfig={{ routes: [{ path: '', config: { spmb: '' } }] }}
        history={}
      />
    </>
  )
}

```

