import React, { useEffect } from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
// import withAxiosDecorator from 'storybook-axios';
import { storiesOf } from '@storybook/react';
import { createService, useOpenApi, useRoaApi, defaultAxiosRequest } from '../src/index'
import { genOssDownloadSignature, genOssUploadSignature } from '../src/oss/index'
import { ApiType } from '../src/const';
import '@alicloud/console-components/dist/wind.css'

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
  // @ts-ignore
  // .addDecorator(withAxiosDecorator(defaultAxiosRequest))
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
  .add('oss', () => {
    useEffect(() => {
      genOssDownloadSignature({bucketName: 'xxxx', objectName: 'xxxx'})
    });

    return <div></div>
  })
