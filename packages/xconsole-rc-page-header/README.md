# @alicloud/xconsole-rc-page-header

> 页面中的头部内容，通常包括面包屑导航 / 页面标题等等

## APIs

### PageHeader

| Param | Type | Default | Description |
|--------|------|---------|-------------|
|title|`ReactNode`||页面一级标题|
|subTitle|`ReactNode`||页面二级标题|
|subSwitcher|`object`||二级标题下拉选择，[Select Props](https://csr632.gitee.io/alibabacloud-console-components/base-components/select)|
|breadcrumbs|`{title: string, text: string, to: string}[]`||面包屑|
|extra|`ReactNode`||面包屑额外内容|
|historyBack|`boolean`||是否展示「返回上级」的图标按钮|
|nav|`Nav`||二级导航|

#### BreadCrumb

| Param | Type | Default | Description |
|--------|------|---------|-------------|
|title|`ReactNode`||标题，`to` 存在时，优先级大于 `text`|
|text|`ReactNode`||标题|
|to|`string`||`Link` 的 `to`|
|...restProps|||`Link` 的其它 Props|

#### Nav

| Param | Type | Default | Description |
|--------|------|---------|-------------|
|shape|`'menu' | 'tab'`|`'tab'`|||
|defaultActiveKey|`string`|||
|activeKey|`string`|||
|items|`{ key: string, titile: string }[]`||
|onChange|`function`||`(key: String/Number) => void`|

## Usage

```js
import PageHeader from '@alicloud/xconsole-rc-page-header';

<PageHeader
  title={
    <Fragment>
      {projectDetail ? `${projectDetail.name} / ` : ''} {project}
    </Fragment>
    }
  nav={nav}
  breadcrumbs={[
    {
      to: getRoutePath(ROUTERS.HOME),
      text: intl('title.home'),
    },
    {
      to: getRoutePath(ROUTERS.PRODUCTS),
      text: intl('menu.title.myapps'),
    },

  ]}
>
  {content}
</PageHeader>
```

