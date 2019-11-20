import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ConsolePage from '../src/index'
import { createBrowserHistory } from 'history'
import { Router, Link } from 'dva/router'
import { Button } from '@alicloud/console-components'

const history =  createBrowserHistory()

const breadcrumb = [
  {
    text: '首页',
    to: '/home',
  },
  {
    text: '列表',
  }
]

storiesOf('ConsolePage', module)
  .add('ConsolePage', () => {
   return (
     <div id="app-wrapper">
       <div id="app">
         <Router history={history}>
           <ConsolePage
             breadcrumb={breadcrumb}
             breadcrumbExtra={<Link to="/home">帮助</Link>}
             breadcrumbExtraAlign="right"
             title="标题"
             subTitle="副标题"
             titleExtra={<Button type="primary">操作</Button>}
             titleExtraAlign="right"
             hasBackArrow
             onBackArrowClick={() => history.push('/home')} 
           >
             <div>Hello, Console Page!</div>
           </ConsolePage>
         </Router>
       </div>
      </div>
    );
  })
