# xconsole-rc-page

为阿里云控制台提供基于页面的基础布局

## Usage

```js
import Page from '@alicloud/xconsole-rc-page';
import { Button } from '@alicloud/console-components'

const breadcrumb = [
  {
    text: '首页',
    to: '/home',
  },
  {
    text: '列表',
  }
]
export default () => (
  <Page
    breadcrumb={breadcrumb}
    breadcrumbExtra={<Link to="/home">帮助</Link>}
    breadcrumbExtraAlign="right"
    title="标题"
    subTitle="副标题"
    titleExtra={<Button type="primary">操作</Button>}
    titleExtraAlign="right"
    hasBackArrow
    onBackArrowClick={() => history.push('/home')}
  >
    <div>Hello XConsole</div>
  </Page>
)
```

## APIs
| 参数 | 类型 | 说明 |
|:--|:--|:--|
| breadcrumb | breadcrumb?: IBreadcrumbItem[]; | 定义面包屑导航区域的内容。|
| breadcrumbExtra | breadcrumbExtra?: React.ReactNode; | 面包屑额外内容。 |
| breadcrumbExtraAlign | breadcrumbExtraAlign?: 'left' \| 'right'; | 面包屑额外内容的位置。 |
| title | title?: React.ReactNode; | 页面一级标题。 |
| subTitle | subTitle?: React.ReactNode; | 页面二级标题。|
| titleExtra | children?: React.ReactNode; | 标题额外内容 |
| titleExtraAlign | breadcrumbExtraAlign?: 'left' \| 'right'; | 标题额外内容的位置 |
| hasBackArrow | hasBackArrow?: boolean; | 是否展示「返回上级」的图标按钮。 |
| onBackArrowClick | onBackArrowClick?: (e: React.SyntheticEvent) => void \| never; | 【默认的「返回上级」按钮】所绑定的onClick回调。 |
| menu | menu?: React.ReactNode; | 内容的导航菜单。通常使用Page.Menu组件来定义，传给这个prop。 |
| children | children?: React.ReactNode;| 实际展示的内容。|