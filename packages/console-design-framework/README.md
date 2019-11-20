# xconsole-rc-app-layout

为阿里云控制台提供基础的应用框架和导航

## Usage

```js
import AppLayout, { useAppMenu } from '@ali/xconsole-rc-app-layout';

const appMenu = {
  header: '产品名',
  items: [
    {
      key: '/overview',
      label: '概览',
    },
    {
      key: '/list',
      label: '列表',
    },
    {
      key: "/others",
      label: "其他",
      items: [
        {
          key: "/help",
          label: "帮助",
          href: 'https://help.aliyun.com',
        },
        {
          key: "/docs",
          label: "文档",
          disabled: true,
          render: ({ key, label }) => (
            <a
              href="https://docs.aliyun.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          )
        },
      ]
    }
  ],
}

// 默认收起 appMenu 的页面
const collapsedPaths = ['/list/:id'];

// 不显示 appMenu 的页面
const invisiblePaths = ['/open'];

const Content = () => {
  const { collapsed, setCollapsed } = useAppMenu()
  return (
    <div>
      <div>collapsed: {collapsed ? 'yes' : 'no'}</div>
      <button onClick={() => setCollapsed(!collapsed)}>Toggle</button>
    </div>
  )
}

export default () => (
  <AppLayout
    menu={appMenu}
    collapsedPaths={collapsedPaths}
    invisiblePaths={invisiblePaths}
  >
    <Content />
  </AppLayout>
)
```

## APIs
| 参数 | 类型 | 说明 |
|:--|:--|:--|
| menu | menu?: MenuDescriptor | ReactNode; | AppMenu 配置。|
| collapsedPaths | collapsedPath?: string[]; | 默认收起 AppMenu 的路径。 |
| invisiblePaths | invisiblePaths?: string[]; | 默认隐藏 AppMenu 的路径。 | 


### MenuDescriptor

| name | type | required | default | description |
| :---: | :---: | :---: | :---: | :--- |
| header | `ReactNode` | | | 导航菜单头部声明 |
| items | `ConsoleMenuItemDescriptor[]` | | | 导航菜单内容的结构化信息，可以参考 [ItemDescriptor](#ItemDescriptor) |
| defaultOpenKeys| <code>string &#124; number &#124; (string &#124; number)[]</code> | | | 默认的当前展开的子菜单根节点的 key ，用于非受控模式 |
| onItemClick | `ItemClickHandler` | | `() => {}` | 菜单项点击事件，[ItemClickHandler](#ItemClickHandler) |

#### ItemDescriptor

| name | type | required | default | description |
| :---: | :---: | :---: | :---: | :--- |
| key | <code>string &#124; number</code> | √ | | 菜单项的 key ，在一个导航里不允许出现重复的 key ，可路由菜单的 key 同时也可以作为匹配单个的路由路径的 pattern ，如果当前的 `location.pathname` 可以匹配当前 key 定义的 pattern ，则该菜单项被选中 |
| to | <code>string &#124; Location &#124; RedirectLocationGetter</code> | | | 菜单项点击后跳转的路径（应用内跳转），也可以通过函数表达式动态返回需要跳转的 pathname 或 location ，请参考 [RedirectLocationGetter](#RedirectLocationGetter) |
| href | `string` | | | 菜单项点击之后跳转的超链接（ url 跳转） |
| linkProps | <code>ReactRouterLinkProps &#124; HTMLLinkAttributes</code> | | | 自定义内置 `Link` 组件的 props ，如果定义了 `to` ，`linkProps` 将透传至 React-Router [Link](https://reacttraining.com/react-router/web/api/Link) 组件；如果定义了 `href` ，则 `linkProps` 将透传至 `<a>` ，如 `target="_blank"` 等 |
| activePathPatterns | `string[]` | | | 定义匹配路由路径的多个 pattern ，如果 `location.pathname` 与其中任意一个 pattern 相匹配，则该菜单项被选中 |
| label | `ReactNode` | | | 菜单项的默认内容 |
| disabled | `boolean` | | `false` | 是否禁用该菜单项 |
| visible | `boolean` | | `true` | 是否显示该菜单项 |
| render | `ConsoleMenuItemRender` | | | 渲染菜单项的函数声明，在运行期执行，[ItemRender](#ItemRender) |
| items | `ItemDescriptor[]` | | | 子菜单项声明 |
| navProps | `any` | | | 透传给基础组件`<Nav>`或者`<Nav.SubNav>`的props，见【使用结构化声明】demo |

#### ItemRender

```typescript
const ItemRender = (item: ItemDescriptor) => ReactNode
```

#### ItemClickHandler

```typescript
const ItemClickHandler = (
  key: string | number,
  item: Menu.Item,
  e: SyntheticEvent
) => void
```