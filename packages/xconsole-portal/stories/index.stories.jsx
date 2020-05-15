import * as React from 'react';
import { storiesOf } from '@storybook/react';
import XconsolePortal from '../src/index'
import '@alife/dpl-console-design-2019/index.css';
import { Button } from '@alicloud/console-components'

storiesOf('XconsolePortal', module)
  .add('XconsolePortal', () => {
   return (<div id="app-wrapper">
      <div id="app" style={{ height: '100%' }}>
        <XconsolePortal
          title="欢迎体验新产品名称"
          productIcon="atm"
          description="Demo产品描述，由产品经理提供关于产品的核心描述文案，建议文案描述不超过100字，并提供主要行动点连接文字。文字标题与描述区域宽各520px，居左显示。由产品经理提供关于产品的核心描述文案，建议文案描述不超过100字。"
          actions={(
            <div>
            <Button type="primary">启用</Button>
            <Button>试用</Button>
          </div>
          )}
        >
          content
        </XconsolePortal>
      </div>
    </div>);
  })
