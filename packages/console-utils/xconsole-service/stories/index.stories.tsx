import React, { useEffect } from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
// import withAxiosDecorator from 'storybook-axios';
import { storiesOf } from '@storybook/react';
import { createService, useOpenApi, useRoaApi, defaultAxiosRequest } from '../src/index'
import { getOssDownloadUrl } from '../src/oss/index'
import { ApiType } from '../src/const';
import '@alicloud/console-components/dist/wind.css'

// @ts-ignore
defaultAxiosRequest.interceptors.request.handlers.unshift({
  fulfilled: (config) => {
    config.baseURL = 'https://oneapi.alibaba-inc.com/mock/oneconsole';
    // config.method = 'GET'
    if(config.url.indexOf('multiApi.json')) {
      config.url = config.url.replace(/multiApi.json/, 'api.json')
      config.url = config.url.replace(/action=undefined/, 'action=DescribeMultiApi')
      console.log(config.url, config.url.replace(/\/tool\/user\/info\.json/, '/data/api.json?action=DescribeUserInfo'))
      config.url = config.url.replace(/\/tool\/user\/info\.json/, 'data/api.json?action=DescribeUserInfo')
    }
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
      (async () => {
        try {
          const a = await createService('xxxx', 'test', {apiType: ApiType.open, disableThrowResponseError: true})({ xxxx:1 })
          console.log('a', a)
          const b = await createService('xxxx', 'test', {apiType: ApiType.open, ignoreError: true})({ xxxx:1 })
          console.log('b', b)
          const c = await createService('ecs', 'DescribeInstances', {apiType: ApiType.open, rawResponseData: true})({ xxxx:1 })
          console.log('c', c)
          const e = await createService('ecs', 'DescribeInstances', {apiType: ApiType.open})({ xxxx:1 })
          console.log('e', e)
          await createService('xxxx', 'test', {apiType: ApiType.open})({ xxxx:1 })
        } catch (e) {
          console.error('d', e)
        }
      })()
    });

    return <div></div>
  })
  .add('oss', () => {
    useEffect(() => {
      getOssDownloadUrl({bucketName: 'xxxx', objectName: 'xxxx'})
    });

    return <div></div>
  })
