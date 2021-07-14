import * as React from 'react';
import {boolean } from '@storybook/addon-knobs'
import errorPrompt from '../../src/ErrorPrompt2';

const responseData = {
  config: {
    url: '/api/data.json',
    method: 'get',
  },
  data: {
    code: 'No_Permission1',
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

export default () => {
  return (
    <div>
      <button onClick={promptError}> show prompt </button>
    </div>
  )
}