import * as React from 'react';
import { storiesOf } from '@storybook/react';
import WindProRcPageHeader from '../src/index'
import '@alife/dpl-console-design-2019/index.css';

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
]

const nav = {
  shape: 'menu',
  defaultActiveKey: 'user',
  onChange: value => console.log(value),
  items: [
    {
      key: 'user',
      title: '用户',
    },
    {
      key: 'role',
      title: '角色',
    },
  ],
}

const dataSource = [
  { value: "10001", label: "Lucy King" },
  { value: 10002, label: "Lily King" },
  { value: 10003, label: "Tom Cat", disabled: true },
  {
    label: "Special Group",
    children: [
      { value: new Date(), label: "new Date()" },
      { value: false, label: "FALSE" },
      { value: 0, label: "ZERO" }
    ]
  }
];

storiesOf('WindProRcPageHeader', module)
  .add('WindProRcPageHeader', () => {
   return (<div id="app-wrapper">
      <div id="app">
        <WindProRcPageHeader
          title={'title'}
          subTitle={'asd'}
          subSwitcher={{ dataSource, onChange: (value) => console.log(value)}}
          historyBack={'/users'}
          breadcrumbs={breadcrumbs}
          nav={nav}
        />
      </div>
    </div>);
  })
