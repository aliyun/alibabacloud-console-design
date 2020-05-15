import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import '@alife/dpl-console-design-2019/index.css'
import XconsoleRcPortal from '../src/index'
import Page from '@alicloud/xconsole-rc-page'
import Info from '@alicloud/console-components-info'
import { Button } from '@alicloud/console-components'

storiesOf('XconsoleRcPortal', module)
  .add('XconsoleRcPortal', () => {
   return (<div id="app-wrapper" style={{ minHeight: '100%'}}>
      <div id="app" style={{ minHeight: '100%'}}>
        <Page>
          <XconsoleRcPortal
           img="https://img.alicdn.com/tfs/TB1qUdkllr0gK0jSZFnXXbRRXXa-304-220.png"
           title="欢迎使用配置审计"
           description="配置审计服务为您提供面向资源的配置历史追踪、配置合规审计、自动修正“不合规”配置等能力。面对大量资源，让您轻松实现基础设施的自主监管，确保持续性合规。"
           actions={(
             <Fragment>
               <Button type="primary">申请公测</Button>
               <Button>产品文档</Button>
             </Fragment>
           )}
          >
            <Info title="相关链接" />
          </XconsoleRcPortal>
        </Page>
      </div>
    </div>);
  })
