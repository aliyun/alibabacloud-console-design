import React from 'react';

import {
  Button,
  Checkbox,
  Dialog as FusionDialog
} from '@alife/next';

import Dialog, {
  alert,
  confirm,
  prompt,
  open,
  slide
} from '../../src';

import DialogContent from './dialog-content';
import communicate from './communicate';

import './index.less';

const handleAlert = () => alert('something');
const handleConfirm = () => confirm('yes?');
const handlePrompt = () => prompt('please write');
const handleOpen = () => open(PROPS);
const handleSlide = () => slide(PROPS);
const handleFusionAlert = () => FusionDialog.alert({
  content: '只能用对象，不能用字符串或 JSX，这一点就被完爆了'
});
const handleFusionConfirm = () => FusionDialog.confirm({
  content: '只能用对象，不能用字符串或 JSX，这一点就被完爆了'
});

const PROPS = {
  title: '易用且抗打的 Dialog',
  content: <DialogContent />,
  buttons: [{
    label: '模拟异步（3 秒），并加载中',
    onClick(field, theDialog) {
      theDialog.lock(true);
      
      setTimeout(() => theDialog.unlock(), 3000);
      
      return false;
    }
  }, {
    label: '模拟异步（3 秒）',
    onClick(field, theDialog) {
      theDialog.lock();
      
      setTimeout(() => theDialog.unlock(), 3000);
      
      return false;
    }
  }, '取消']
};

export default class extends React.Component {
  static displayName = 'TheDemo';
  
  state = {
    useSlide: true,
    component: false
  };
  
  render() {
    const {
      state: {
        useSlide,
        component
      }
    } = this;
    
    return <div className="demo-simple-promises">
      <h1><span role="img" aria-label="ANGEL">😇</span> 最简使用 (<code>promise</code>)</h1>
      <Button {...{
        children: 'alert()',
        onClick: handleAlert
      }} />
      <Button {...{
        children: 'confirm()',
        onClick: handleConfirm
      }} />
      <Button {...{
        children: 'prompt()',
        onClick: handlePrompt
      }} />
      <Button {...{
        children: 'open()',
        onClick: handleOpen
      }} />
      <Button {...{
        children: 'slide()',
        onClick: handleSlide
      }} />
      <h1><span role="img" aria-label="DUMB">😳</span> 组件形式使用</h1>
      <p>跟 Fusion 的 Dialog 不同，我不提供 <code>visible</code> prop，Dialog 渲染与否可以用三元表达式来处理。</p>
      <Button {...{
        children: 'component open',
        onClick: () => this.setState({
          component: true
        })
      }} />
      <Checkbox {...{
        label: 'mode: slide',
        checked: useSlide,
        onChange: value => this.setState({
          useSlide: value
        })
      }} />
      {component ? <Dialog {...{
        ...PROPS,
        mode: useSlide ? 'slide' : undefined,
        onClose: () => this.setState({
          component: false
        })
      }} /> : null}
      
      <h1><span role="img" aria-label="KISS">😘</span> 高级用法</h1>
      <Button {...{
        children: '内容与 Dialog 之间的交流',
        onClick: communicate
      }} />
      
      <h1><span role="img" aria-label="SHIT">💩</span> Fusion Dialog</h1>
      <Button {...{
        children: 'fusion alert()',
        onClick: handleFusionAlert
      }} />
      <Button {...{
        children: 'fusion confirm()',
        onClick: handleFusionConfirm
      }} />
    </div>;
  }
}
