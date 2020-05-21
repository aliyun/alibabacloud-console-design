# @alicloud/xconsole-context

> 控制台 context

整合了以下几个 context

* @alicloud/xconsole-console-base-context
* @alicloud/xconsole-region-context
* @alicloud/xconsole-model
* @alicloud/xconsole-widget-load-management

## Usage

```js
import { XConsoleProvider, XConsoleContext } from '@alicloud/wind-pro-provider';

const App = () => {
  return (
    <XConsoleProvider app={} history={}>
      {
        //...
      }
    </XConsoleProvider>
  )
}
```

它实际上等效于

```js
(<Context.Provider value={{ app, history }}>
  <ConsoleBaseProvider>
    <RegionProvider>
      <ModelProvider>
        <WidgetLoadManagementProvider>
          {
            //...
          }
        </WidgetLoadManagementProvider>
      </ModelProvider>
    </RegionProvider>
  </ConsoleBaseProvider>
</Context.Provider>)
```

