import * as React from 'react';
import {boolean } from '@storybook/addon-knobs'
import ErrorCenter from '../../src';

const responseData = {
  config: {
    url: '/api/data.json',
    method: 'get',
  },
  data: {
    code: 'No_Permission1',
    data: {}
  }
};

const getError = () => {
  const err = new Error('test');
  // @ts-ignore
  err.response = responseData;
  return err;
}

export default () => {
  const enable = boolean('enable', false);
  const handler = ErrorCenter({
    enable,
    errorCodes: {
      No_Permission: {
        message: '没有权限'
      }
    },
    getMessage(code) {
      return code;
    }
  });

  return (
    <div>
      <button onClick={() => {handler.onError(getError())}}> show prompt </button>
    </div>
  )
}