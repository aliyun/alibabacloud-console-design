# @alicloud/xconsole-widget-load-management

> 提供全局 widget 加载器，进行  widget 加载优化

## Usage

```js
import { WidgetLoadManagementContext, WidgetLoadManagementProvider } from '@alicloud/xconsole-widget-load-management';

const App = () => {
  return (
    <WidgetLoadManagementProvider>
      {
        () => {
          const { loadWidget } = useContext(WidgetLoadManagementContext);
        }
      }
    </WidgetLoadManagementProvider>
  )
};
```

`xconsole-context` 中已经默认提供了 `WidgetLoadManagementProvider`

通过 `loadWidget` 加载 `widget` 时会优先去缓存中去取，不存在时才会去远程加载并缓存
