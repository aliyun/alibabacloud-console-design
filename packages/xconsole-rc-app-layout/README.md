# @alicloud/xconsole-rc-app-layout

> 页面布局组件

## APIs

### AppLayout

| Param | Type | Default | Description |
|-------|------|---------|-------------|
|sidebar|`object`||`menu` 配置|
|sidebar.collapsedKeys|`string[]`||pathname 数组，当路由命中时，收起 menu|
|sidebar.header|`string`||menu 标题|
|sidebar.items|`Item[]`||

### Item
| Param | Type | Default | Description |
|-------|------|---------|-------------|
|key|`string | number`||菜单项的 `key` ，在一个导航里不允许出现重复的 `key` ，可路由菜单的 `key` 同时也可以作为匹配单个的路由路径的 `pattern` ，如果当前的 `location.pathname` 可以匹配当前 `key` 定义的 `pattern` ，则该菜单项被选中|
|to|`string  | (context: { match: any; location: history.Location }, item: Item) => string`||菜单项点击后跳转的路径（应用内跳转），也可以通过函数表达式动态返回需要跳转的 `pathname` 或 `location` ，请参考 RedirectLocationGetter|
|label|`string`||定义默认显示的内容|
|activePathPatterns|`string[]	`||定义匹配路由路径的多个 `pattern` ，如果 `location.pathname` 与其中任意一个 `pattern` 相匹配，则该菜单项被选中|
|visible|`boolean`|`true`|是否显示该菜单项|
|disabled|`boolean`|`false`|是否禁用该菜单项|
|href|`string`||跳链地址|
|linkProps|`ReactRouterLinkProps | HTMLLinkAttributes`||自定义内置 `Link` 组件的 `props` ，如果定义了 `to` `，linkProps` 将透传至 React-Router `Link` 组件；如果定义了 `href` ，则 `linkProps` 将透传至 `<a>`，如 target="_blank" 等|
|items|`Item[]`||子菜单项声明|
|render|`ConsoleMenuItemRender`||渲染菜单项的函数声明，在运行时执行|

## Usage

```js
import { AppLayout, AppLayoutContext, withNavCollapsed } from '@alicloud/xconsole-rc-app-layout';

const App1 = () => {
  return (
    <AppLayout sidebar={{}}>
      {
        () => {
          // navCollapsed 导航是否收起
          const { navCollapsed } = useContext(AppLayoutContext);

          return null;
        }
      }
    </AppLayout>
  )
};

const App2 = withNavCollapsed(({ navCollapsed }) => {
  return <></>;
})
```
