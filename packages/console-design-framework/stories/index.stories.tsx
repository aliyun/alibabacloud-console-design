import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ConsoleFramework, { useAppMenu } from '../src/index'
import { createBrowserHistory } from 'history'
import { Router } from 'dva/router'

const menu = {
  header: '产品名',
  defaultOpenKeys: ['list'],
  items: [
    {
      key: 'overview',
      label: '概览',
    },
    {
      key: 'list',
      label: '列表',
      items: [
        {
          key: 'bar',
          label: '列表',
          render: ({key, label}) => (
            <a key={key} href="taobao.com" target="_blank">{label}</a>
          )
        },
        {
          key: 'foo',
          label: '列表',
          href: 'https://taobao.com',
        },
      ]
    }
  ]
}

const history =  createBrowserHistory()

const Content = () => {
  const { collapsed, setCollapsed, visible } = useAppMenu()
  return (
    <div>
      <div>collapsed: {collapsed ? 'yes' : 'no'}</div>
      <div>visible: {visible ? 'yes' : 'no'}</div>
      <button onClick={() => setCollapsed(!collapsed)}>toggle</button>
    </div>
  )
}

storiesOf('ConsoleFramework', module)
  .add('ConsoleFramework', () => {
   return (<div id="app-wrapper">
      <Router history={history}>
        <div id="app">
         <ConsoleFramework
           menu={menu}
           collapsedPaths={['list']}
           invisiblePaths={['list']}
         >
           <Content />
         </ConsoleFramework>
        </div>
      </Router>
    </div>);
  })
