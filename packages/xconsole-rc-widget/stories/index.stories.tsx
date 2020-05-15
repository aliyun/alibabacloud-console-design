import * as React from 'react';
import { storiesOf } from '@storybook/react';
import XconsoleRcWidget from '../src/index'

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

storiesOf('XconsoleRcWidget', module)
  .add('XconsoleRcWidget', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <XconsoleRcWidget
         id="@ali/widget-xconsole-description"
         version="1.x"
         props={{ 
           title: '实例信息',
           items,
           dataSource,
         }}
        />
      </div>
    </div>);
  })