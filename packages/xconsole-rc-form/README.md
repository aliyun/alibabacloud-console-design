# @alicloud/xconsole-rc-form

> 基于 rc-form 封装的表单组件

## APIs

### Form

表单

| Param | Type | Default | Description |
|-------|------|---------|-------------|
|dataSource|`object`|`{}`|数据源|
|items|`form => Form.Item[]`||表单项|
|operation|`ReactElement`||Form 底部操作区|
|fixFooter|`boolean`|`true`|是否是定位到页面底部|
|className|`string`||表单 className|
|inline|`boolean`||内联表单	|
|size|`enum`|`'medium'`|单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。可选值：'large', 'medium', 'small'|
|fullWidth|`boolean`||单个 Item 中表单类组件宽度是否是100%	|
|labelAlign|`enum`|`'left'`|标签的位置。可选值：'top', 'left', 'inset'|
|labelTextAlign|`enum`||标签的左右对齐方式。可选值：'left', 'right'|
|field|`any`||field 实例, 传 false 会禁用 field	|
|saveField|`Function`|`noop`|保存 Form 自动生成的 field 对象|
|labelCol|`Object`||控制第一级 Item 的 labelCol|
|wrapperCol|`Object`||控制第一级 Item 的 wrapperCol|
|onSubmit|`Function`|`function preventDefault(e) { e.preventDefault(); }`|form内有 htmlType="submit" 的元素的时候会触发|
|value|`any`||表单数值|
|onChange|`(values: Object, item: Object) => void`|`noop`|表单变化回调|
|component|`String | Function`|`'form'`|设置标签类型|
|device|`Enum`|`'desktop'`|预设屏幕宽度。可选值：'phone', 'tablet', 'desktop'|
|responsive|`boolean`||是否开启内置的响应式布局 （使用ResponsiveGrid）|
|isPreview|`boolean`||是否开启预览态|
|useLabelForErrorMessage|`boolean`||是否使用 label 替换校验信息的 name 字段|

#### Form.Item

| Param | Type | Default | Description |
|-------|------|---------|-------------|
|label|`ReactNode`||label 标签的文本|
|dataIndex|`string`||表单项 key|
|initialValue|`any`||
|validateRules|`Object[]`||Validator rules. see: [async-validator](https://github.com/yiminghe/async-validator)|
|element|`ReactNode`||表单项组件|
|helper|`ReactNode`||自定义提示信息，如不设置，则会根据校验规则自动生成|
|visible|`boolean`|`true`|是否展示表单项|
|asterisk|`boolean`|`false`|required 的星号是否显示|

### Submit extends [Button](https://csr632.gitee.io/alibabacloud-console-components/base-components/button)

提交按钮

| Param | Type | Default | Description |
|-------|------|---------|-------------|
|onClick|`(values) => void`||点击按钮的回调|
|validate|`boolean`|`true`|是否在点击按钮时校验表单|

### Reset

重置按钮

| Param | Type | Default | Description |
|-------|------|---------|-------------|
|onClick|`(values) => void`||点击按钮的回调|
|fields|`[names: String[]]`||重置的 input，默认所有|

## Usage

```js
import Form, { Submit, Reset, FormContext } from '@alicloud/xconsole-rc-form';

<Form
  operation={(
    <Fragment>
      <Form.Submit
        type="primary"
        loading={!(error instanceof Error) && loading}
        onClick={(values) => {
          create({ appName: app, packageVersion: values.version, title: values.title, strategy: values.strategy })
        }}
      >
        {intl('ui.button.ok')}
      </Form.Submit>
    </Fragment>
  )}
  items={form => [
    {
      dataIndex: 'title',
      label: intl('deploy.prop.title.label'),
      validateRules: [
        {
          required: true,
          message: intl('instance.form.edit.name.error.required'),
        },
      ],
      element: <Input />,
      initialValue: 'testTitle',
    },
    {
      dataIndex: 'version',
      label: intl('deploy.prop.version.label'),
      initialValue: versions[0] && versions[0].value,
      element: (
        <VersionsSelector versions={versions} app={app} />
      ),
    },
    {
      dataIndex: 'strategy',
      label: intl('deploy.prop.strategy.label'),
      initialValue: '1',
      visible: true,
      element: <Radio.Group dataSource={strategyDataSource} />,
    },
  ]}
/>
```

