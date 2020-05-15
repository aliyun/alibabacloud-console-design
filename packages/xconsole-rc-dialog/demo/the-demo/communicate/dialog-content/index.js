import React from 'react';

import {
  Form,
  Input,
  NumberPicker,
  Checkbox,
  Message,
  Button
} from '@alife/next';

import {
  hocDialogContent
} from '../../../../src';

import {
  FIELD_NAME
} from '../_common';

@hocDialogContent
export default class extends React.Component {
  static displayName = 'DialogContent';

  render() {
    const {
      context: {
        field,
        field: {
          init,
          getValue
        },
        lock,
        unlock,
        focus,
        onContentUpdate
      }
    } = this;

    return <Form {...{
      field
    }}>
      <Message {...{
        type: 'warning',
        title: '以下是怎么做到的？',
        children: '请使用 Dialog 提供的 HOC：import { hocDialogContent } from "@alicloud/xconsole-rc-dialog";'
      }} />
      <Message {...{
        type: 'notice',
        title: '从内部控制 Dialog',
        children: <div>
          Dialog 的 context 提供了 <code>field</code>、<code>lock</code>、<code>unlock</code>、<code>close</code>、<code>onContentUpdate</code> 等方法。通过这些方法，你可以很方便的协调两者之间的交互。
        </div>
      }} />
      <Form.Item {...{
        label: '名字',
        required: true
      }}>
        <Input {...init(FIELD_NAME.NAME, {
          rules: [{
            required: true
          }]
        })} />
      </Form.Item>
      <Form.Item {...{
        label: '模拟提交耗时（1-5 秒）'
      }}>
        <NumberPicker {...init(FIELD_NAME.TIME, undefined, {
          min: 1,
          max: 5
        })} />
        &nbsp;
        <Checkbox {...init(FIELD_NAME.FAKE_FAIL, {
          valueName: 'checked'
        }, {
          label: '提交失败'
        })} />
      </Form.Item>
      <Message {...{
        type: 'notice',
        title: '锁定',
        children: <div>
          <code>lock/unlock</code> - 成对出现的方法，用以避免在一些异步场景下因 Dialog 关闭而出现的 <code>setState</code> 错误。<br />
          注意，锁定之后，无论通过何种方式都无法关闭 Dialog，所以异步操作之后，不管成功与否，都必须 unlock。
        </div>
      }} />
      <Form.Item {...{
        label: '锁定时间（1-5 秒）'
      }}>
        <NumberPicker {...init(FIELD_NAME.LOCK_TIME, undefined, {
          min: 1,
          max: 5
        })} />
        &nbsp;
        <Checkbox {...init(FIELD_NAME.LOCK_USE_LOADING, {
          valueName: 'checked'
        }, {
          label: '锁定时 Loading'
        })} />
        &nbsp;
        <Button {...{
          children: `锁定 ${getValue(FIELD_NAME.LOCK_TIME)} 秒${getValue(FIELD_NAME.LOCK_USE_LOADING) ? '（且展示 Loading）' : ''}`,
          onClick: () => {
            lock(getValue(FIELD_NAME.LOCK_USE_LOADING));

            setTimeout(unlock, getValue(FIELD_NAME.LOCK_TIME) * 1000);
          }
        }} />
      </Form.Item>
      <Message {...{
        type: 'notice',
        title: '焦点控制',
        children: <span>Dialog 会自动接管焦点，如果有场景是：内容是异步出来的，而且有需要获得焦点的元素，可以在内容出来之后执行 <code>focus()</code> 方法。</span>
      }} />
      <Form.Item>
        <Button {...{
          children: '点击之后，Dialog 中的第一个可获得焦点元素（Input 优先）将获得焦点',
          onClick: () => focus()
        }} />
      </Form.Item>
      <Message {...{
        type: 'warning',
        title: '内容组件通知 Dialog 说自己变化了',
        children: <div>用 hocDialogContent 的内容组件不需要手动调用它，因为 hocDialogContent 已经做了。</div>
      }} />
      <Message {...{
        type: 'notice',
        title: 'debug',
        children: <span>你可能会看到 values 和 errors 两个色块，这个是 Dialog 提供的一个针对 Field 的 debug 功能，只要调用的时候传入 <code>debug: true</code> 就行了。</span>
      }} />
    </Form>;
  }
}
