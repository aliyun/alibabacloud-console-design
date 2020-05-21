# @alicloud/xconsole-region-context

> 提供 region 上下文

## Usage

```js
import { RegionProvider, RegionContext } from '@alicloud/xconsole-region-context';

const App = () => {
  return (
    <RegionProvider>
      {
        ({ app, history, activeRegionId }) => {
          return null;
        }
      }
    </RegionProvider>
  )
}
```

`activeRegionId` 由 `@alicloud/xconsole-rc-region` 获得