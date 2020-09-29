import * as React from 'react';
import { select, text, boolean } from '@storybook/addon-knobs'
import { ErrorPrompt as errorPrompt } from '../../src';

export default () => {
  const dialogType = select('DialogType', ['alert', 'prompt'], 'prompt');
  const message = text('Message', 'Show Error');
  const confirmLabel = text('ConfirmLabel', '去登录');
  const cancelLabel = text('CancelLabel', '知道了');
  const confirmHref = text('ConfirmHref', 'https://signin.aliyun.com/login.htm');
  const cancelHref = text('CancelHref', 'https://signin.aliyun.com/login.htm');
  const disableExtraInfo = boolean('DisableExtraInfo', true);

  const promptError = () => 
    errorPrompt(
      new Error('There is an error'),
      { 
        errorConfig: {
          message,
          confirmLabel,
          cancelLabel,
          cancelHref,
          confirmHref
        },
        dialogType,
        disableExtraInfo,
      }
    );

  return (
    <div>
      <button onClick={promptError}> show prompt </button>
    </div>
  )
}