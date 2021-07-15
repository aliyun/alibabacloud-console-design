import * as React from 'react';
import { text } from '@storybook/addon-knobs'
import errorPrompt from '../../src/errorPrompt2/ErrorPrompt2';


export default () => {
  const code = text('Error Code', 'No_Permission1');

  const responseData = {
    config: {
      url: '/api/data.json',
      method: 'get',
    },
    data: {
      code: code,
      message: '没有权限',
      requestId: 'xxxx-xxxx',
      data: {}
    }
  };
  
  
  const getError = () => {
    const err = new Error('test');
    // @ts-ignore
    err.response = responseData;
    return err;
  }

  const promptError = () => errorPrompt({
    error: getError(),
    errorConfig: {
      message: '没有权限',
    },
    getMessage(code) {
      return code;
    }
  });

  return (
    <div>
      <button onClick={promptError}> show prompt </button>
    </div>
  )
}