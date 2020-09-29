import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import '@alife/dpl-console-design-2019/index.css'
import XconsoleRcResult from '../src/index'
import Page from '@alicloud/xconsole-rc-page'
import Info from '@alicloud/console-components-info'
import { Button } from '@alicloud/console-components'

storiesOf('XconsoleRcResult', module)
  .add('XconsoleRcResult', () => {
   return (<div id="app-wrapper">
      <div id="app">
        <Page title="用户详情">
          <XconsoleRcResult
            type="success"
            title="创建成功，标题居左对齐，标题（不含icon）宽度根据文字内容自适应，超出400px后折行"
            description="描述内容，文案居左对齐，宽度根据文字内容自适应，超出400px后折行，此样式规则适用于页面、Slidepanel、对话框中的结果反馈。"
            actions={(
              <Fragment>
                <Button type="primary">去列表查看</Button>
                <Button>再次创建</Button>
              </Fragment>
            )}
          >
            <Info title="相关链接" />
          </XconsoleRcResult>
        </Page>
      </div>
    </div>);
  })
