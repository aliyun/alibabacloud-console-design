# xconsole-rc-widget

为阿里云控制台提供快捷使用 Widget 的组件

## Usage

```js
import Widget from '@alicloud/xconsole-rc-widget';

const items = [
  {
    label: '实例 ID',
    dataIndex: 'InstanceId',
  },
  {
    label: '地域',
    dataIndex: 'RegionId',
  },
  {
    label: '规格',
    dataIndex: 'Config',
  },
  {
    label: '创建时间',
    dataIndex: 'CreatedDate',
  },
]

const dataSource = {
  InstanceId: 'rds-xxxxx',
  RegionId: 'cn-hanghou',
  Config: 'xxxxx',
  CreatedDate: '2019-10-10',
}

export default () => (
  <Widget
    id="@ali/widget-xconsole-description"
    version="1.x"
    props={{
      title: '实例信息',
      items,
      dataSource,
    }}
   />
)
```

## APIs
| 参数 | 类型 | 说明 |
|:--|:--|:--|
| id | id: string; | widgtId。|
| version | version: string; | 所需 widget 的大版本号或具体版本号(如：1.x 或 1.0.0)	。 |
| loadOptions | loadOptions?: {}; | 当前加载 widget 时的一些加载配置 |
| props | props?: { [key: string]: any }; | 传给 Widget 的 props |