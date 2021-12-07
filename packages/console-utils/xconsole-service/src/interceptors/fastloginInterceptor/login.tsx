import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'
import { render } from '@alicloud/console-fastlogin';
import { Button, Dialog } from '@alicloud/console-components'

import searchParamsInterceptor from '../paramsInterceptor/index';
import { getSecToken, getUmid, getCollina } from '../../utils/index';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(searchParamsInterceptor);

export const refreshToken = async () => {
  const reqData = {
    'sec_token': getSecToken(),
    umid: getUmid(),
    collina: getCollina(),
  };

  try {
    const res = await axiosInstance({
      method: 'get',
      url: '/tool/user/info.json',
      // url: 'https://oneapi.alibaba-inc.com/mock/oneconsole/data/api.json?product=consoledemo&action=DescribeUserInfo',
      data: reqData,
      timeout: 15000,
    });

    const { data: { data: resData } } = res;
    // @ts-ignore
    window.ALIYUN_CONSOLE_CONFIG && (window.ALIYUN_CONSOLE_CONFIG.SEC_TOKEN = resData?.secToken);
  } catch (e) {
    console.log('xxxxxxx',e)
    // TODO
  }
}

export const LoginContent: React.FC<any> = (props) => {
  const ref = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (ref.current || document.querySelector('#loginContent')) {
        (async () => {
          try {
            const result = await render({ env: 'prepub', target: ref.current || document.querySelector('#loginContent'), height: 560 });
            console.log(result)
            if (result.success) {
              await refreshToken();
            }
            props.onSuccess()
          } catch(e) {
            console.log(e)
            props.onError(e);
          }
        })()
      }
    }, 1000)
  }, [ref.current]);

  return (
    <Dialog visible footer={<div/>} onClose={() => {props.onError()}}>
      <div style={{height: 660, width: 500, paddingTop: 20}}>
        <div ref={ref} id="loginContent" ></div>
        <div style={{textAlign: 'center', width: 500, paddingTop: 20, fontSize: 13}}>
          <span style={{verticalAlign: 'text-top'}}>快速登录有问题？直接去</span>
          <Button text type="primary">登录页</Button>
          <span style={{verticalAlign: 'text-top'}}>登录</span>
        </div>
      </div>
    </Dialog>
  )
}

export const login = (response: AxiosResponse) => {
  return new window.Promise<AxiosResponse>((resolve, reject) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(
      <LoginContent
        onSuccess={async () => {
          try {
            setTimeout(async() => {
              const reqData = new URLSearchParams(response.config.data);
              reqData.set('sec_token', getSecToken())
              const newResponse = await axios.request({
                method: 'post',
                url: response.config.url,
                baseURL: '/',
                data: reqData.toString()
              })
              resolve(newResponse);
              ReactDOM.unmountComponentAtNode(div);
            }, 200)
          } catch (e) {
            reject(e);
          }
        }}
        onError={() => {
          ReactDOM.unmountComponentAtNode(div);
          reject(response);
        }}
      />, div);
  })
}
