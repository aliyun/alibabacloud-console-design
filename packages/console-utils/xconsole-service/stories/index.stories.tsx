import React, { useEffect } from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { createService, useOpenApi, useRoaApi, defaultAxiosRequest } from '../src/index'
import { ApiType } from '../src/const';
import '@alicloud/console-components/dist/wind.css'
import RiskDialog from './demo/riskDialog';

// @ts-ignore
defaultAxiosRequest.interceptors.request.handlers.unshift({
  fulfilled: (config) => {
    config.baseURL = 'https://oneapi.alibaba-inc.com/mock/oneconsole';
    config.method = 'GET'
    return config;
  }
});

storiesOf('XConsole Service', module)
  .addDecorator(withKnobs)
  .add('AppCode', () => {
    const action = select('action', ['DescribeInstance', 'DescribeAPI'], 'DescribeInstance')
    const { data, error } = useOpenApi('consoledemo', action, null, { throwDoubleConfirmError: true })
    // @ts-ignore
    console.log(error?.response)
    return <div>{JSON.stringify(data)}{JSON.stringify(error)}</div>
  })
  .add('ROA', () => {
    const action = select('action', ['DescribeInstance', 'DescribeAPI'], 'DescribeInstance')
    const { data } = useRoaApi(
      'ros', 
      action, 
      {
        params: { "test": 2 },
        content: { "test": 1 }
      }
    )
    return <div>{JSON.stringify(data)}</div>
  })
  .add('createService', () => {
    useEffect(() => {
      createService('xxxx', 'test', {apiType: ApiType.open})({ xxxx:1 })
    });

    return <div></div>
  })

  .add('riskDialog', RiskDialog)
