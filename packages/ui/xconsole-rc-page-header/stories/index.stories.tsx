import * as React from 'react';
import { Route, Router, Link } from 'dva/router';
import { Button } from '@alicloud/console-components'
import { createBrowserHistory } from 'history';
import { storiesOf } from '@storybook/react';
import WindProRcPageHeader from '../src';
import  '../src/index.less';
import '@alicloud/console-components/dist/wind.css';

const breadcrumbs = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/users',
    text: 'UserList',
  },
  {
    text: 'UserProfile',
  },
];

const nav = {
  shape: 'menu',
  // activeKey: 'user1',
  // defaultOpenKeys: ['user'],
  onChange: (value) => console.log(value),
  items: [
    {
      key: 'user',
      title: '用户',
      items: [{
        key: 'user1',
        visible: true,
        title: (<Link to="/">用户2</Link>),
      }]
    },
    {
      key: 'role',
      visible: false,
      title: <div>'角色'</div>,
    },
    {
      key: 'role3',
      // visible: false,
      title: '角色2',
    },
    {
      key: 'role1',
      // visible: false,
      title: '角色3',
    },
  ],
};

const dataSource = [
  { value: '10001', label: 'Lucy King' },
  { value: 10002, label: 'Lily King' },
  { value: 10003, label: 'Tom Cat', disabled: true },
  {
    label: 'Special Group',
    children: [
      { value: new Date(), label: 'new Date()' },
      { value: false, label: 'FALSE' },
      { value: 0, label: 'ZERO' },
    ],
  },
];

const App = () => (
  <WindProRcPageHeader
    title="title"
    historyBack="/users"
    breadcrumbs={breadcrumbs}
    nav={nav}
  />
);

storiesOf('WindProRcPageHeader', module).add('WindProRcPageHeader', () => {
  return (
    <div id="app-wrapper">
      <Router history={createBrowserHistory()}>
        <Route path="/" component={App} />
      </Router>
    </div>
  );
});
