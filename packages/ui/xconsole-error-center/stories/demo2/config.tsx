import * as React from 'react';
import { select, text, boolean } from '@storybook/addon-knobs'
import errorPrompt from '../../src/ErrorPrompt2';

export default () => {
  const message = text('Message', '自定义 Error ❌ ');
  const ignore = boolean('Ignore', false);
  const confirmLabel = text('ConfirmLabel', '去登录');
  const cancelLabel = text('CancelLabel', '知道了');
  const confirmHref = text('ConfirmHref', 'https://signin.aliyun.com/login.htm');
  const cancelHref = text('CancelHref', 'https://signin.aliyun.com/login.htm');

  const promptError = () => 
    errorPrompt(
      { 
        errorConfig: {
          title: '自定义 Error ❌',
          message,
          confirmLabel,
          cancelLabel,
          cancelHref,
          confirmHref,
          ignore,
        },
        error: new Error('There is an error')
      },
    );

  return (
    <div>
      <button onClick={promptError}> show prompt </button>
    </div>
  )
}