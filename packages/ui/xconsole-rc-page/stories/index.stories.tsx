import * as React from 'react';
import { Router, Link } from 'dva/router';
import { storiesOf } from '@storybook/react';
import { createBrowserHistory } from 'history';
import '@alicloud/console-components/dist/wind.css';
import { Button } from '@alicloud/console-components';
import XconsoleRcPage from '../src/index';

const history = createBrowserHistory();

const breadcrumb = [
  {
    text: '首页',
    to: '/home',
  },
  {
    text: '列表',
  },
];

storiesOf('XconsoleRcPage', module).add('XconsoleRcPage', () => {
  return (
    <div id="app-wrapper">
      <div id="app">
        <Router history={history}>
          <XconsoleRcPage
            breadcrumbs={breadcrumb}
            breadcrumbExtra={<Link to="/home">帮助</Link>}
            breadcrumbExtraAlign="right"
            title="标题"
            subTitle="副标题"
            titleExtra={<Button type="primary">操作</Button>}
            titleExtraAlign="right"
            hasBackArrow
            onBackArrowClick={() => history.push('/home')}
          >
            <div>Hello, XConsole Page!</div>
          </XconsoleRcPage>
        </Router>
      </div>
    </div>
  );
});
