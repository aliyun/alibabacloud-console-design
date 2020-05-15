import React from 'react';

import {
  Button,
  Message,
  Input,
  Select,
  Balloon,
  Dialog as FusionDialog
} from '@alife/next';

import './index.less';

const handleFusionAlert = () => FusionDialog.alert({
  content: '只能用对象，不能用字符串或 JSX，这一点就被完爆了'
});
const handleFusionConfirm = () => FusionDialog.confirm({
  content: '只能用对象，不能用字符串或 JSX，这一点就被完爆了'
});

export default class extends React.Component {
  render() {
    return <div className="demo-dialog-content">
      <h5>焦点管理</h5>
      <p>内部可以获得焦点的元素（<code>input</code>、<code>button</code>、<code>a</code> 和有 <code>tabIndex</code> 的元素），最先获得焦点的因是第一个 input 元素（有的话）。焦点不会跳出 Dialog 之外。</p>
      <ul className="test-area">
        <li><Button>hello</Button></li>
        <li><a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">www.aliyun.com</a></li>
        <li><Input /></li>
      </ul>
      <h5>关闭</h5>
      <p>除了通过按钮和 X，你可以经由 ESC 快捷键进行关闭，在有 Balloon 和 Select 的时候会优先关闭它们。</p>
      <p>Dialog 「锁定」状态下无法关闭，锁定（<code>lock()</code>）之后必须解锁（<code>unlock()</code>）。</p>
      <ul className="test-area">
        <li>
          <Select {...{
            dataSource: [{
              label: 'label 1',
              value: 1
            }, {
              label: 'label 2',
              value: 2
            }]
          }} />
        </li>
        <li>
          <Balloon trigger={<span>我有个气球提示</span>}>我是气球提示</Balloon>
        </li>
        <li>
          <Button {...{
            children: 'toast',
            onClick() {
              Message.notice({
                content: 'some toast 5 s',
                duration: 5000
              });
            }
          }} />
        </li>
        <li>
          <Button {...{
            children: 'FusionDialog alert',
            onClick: handleFusionAlert
          }} />
        </li>
        <li>
          <Button {...{
            children: 'FusionDialog confirm',
            onClick: handleFusionConfirm
          }} />
        </li>
      </ul>
      <h5>国际化</h5>
      <p>Dialog 本身不会渲染任何按钮，但 <code>alert/confirm/prompt</code> 需要设置 ok 和/或 cancel，这需要使用者自己处理。</p>
    </div>;
  }
}
