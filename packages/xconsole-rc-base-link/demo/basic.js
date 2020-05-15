import React, { Component } from 'react'
import Link from '@ali/wind-rc-link'

import { Switch, Route } from 'dva/router'
import FakeBrowser from '@ali/wind-fake-browser'

import './basic.less'

class Basic extends Component {
  render() {
    return (
      <div>
        <h3>普通4</h3>
        <p>
          <Link href="https://taobao.com">Normal Link</Link>
        </p>
        <h3>相对链接</h3>
        <p>
          <Link to="relative" relative>Relative Link</Link>
        </p>
        <h3>禁用 (Boolean)</h3>
        <p>
          <Link to="/enabled">enabled</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/disabled" disabled>disabled</Link>
        </p>
        <h3>禁用 (Function)</h3>
        <p>
          <Link to="/enabled" disabled={value => value.startsWith('$')}>enabled</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/disabled" disabled={value => value.indexOf('disabled') > -1}>disabled</Link>
        </p>
        <h3>隐藏</h3>
        <p>
          <Link to="/visible">visible</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/invisible" visible={false}>invisible</Link>
        </p>
        <h3>隐藏 (Function)</h3>
        <p>
          <Link to="/visible" visible={value => value === '/visible'}>visible</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/invisible" visible={value => value === '/visible'}>invisible</Link>
        </p>
        <h3>按钮</h3>
        <p>
          <Link to="/normal" shape="button">Button Link</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/normal" shape="button" type="primary">Primary Link Button</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/normal" shape="button" size="small">Small Link Button</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/normal" shape="button" size="large">Large Link Button</Link>
        </p>
      </div>
    )
  }
}

const AppRouter = ({ history }) => (
  <Switch>
    <Route path="/" component={Basic} />
    <Route path="*" component={Basic} />
  </Switch>
)

// 这里仅为 Demo 展示方便，项目中直接使用 <AppRouter /> 即可
const App = () => (

  <FakeBrowser
    key={Date.now()}
    position="fixed"
    width="600px"
    height="auto"
    left="0"
    top="0"
    bottom="40px"
  >
    <AppRouter />
  </FakeBrowser>

)


export default App
