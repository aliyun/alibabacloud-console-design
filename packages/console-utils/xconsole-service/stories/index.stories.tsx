import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { useOpenApi, useRoaApi, defaultAxiosRequest } from '../src'

defaultAxiosRequest.interceptors.request.use((config) => {
  config.transformRequest = [(data) => {
    return config.data;
  }]
  return config;
})

storiesOf('XConsole Service', module)
  .addDecorator(withKnobs)
  .add('AppCode', () => {
    const action = select('action', ['DescribeInstance', 'DescribeAPI'], 'DescribeInstance')
    const { data } = useOpenApi('ros', action, null, { ignoreError: true })
    return <div>{JSON.stringify(data)}</div>
  })
  .add('ROA', () => {
    const action = select('action', ['DescribeInstance', 'DescribeAPI'], 'DescribeInstance')
    const { data } = useRoaApi(
      'ros', 
      action, 
      {
        params: {"test": 2},
        content: {"test": 1}
      }
    )
    return <div>{JSON.stringify(data)}</div>
  })
