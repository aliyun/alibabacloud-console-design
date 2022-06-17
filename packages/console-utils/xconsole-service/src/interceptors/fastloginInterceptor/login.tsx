import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'
import { render } from '@alicloud/console-fastlogin';
import { Dialog } from '@alicloud/console-components';

import messages from './messages';
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

  const res = await axiosInstance({
    method: 'get',
    url: '/tool/user/info.json',
    data: reqData,
    timeout: 15000,
  });

  const { data: { data: resData } } = res;
  // @ts-ignore
  window.ALIYUN_CONSOLE_CONFIG && (window.ALIYUN_CONSOLE_CONFIG.SEC_TOKEN = resData?.secToken);
}

export const LoginContent: React.FC<any> = (props) => {
  const ref = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (ref.current || document.querySelector('#loginContent')) {
        (async () => {
          try {
            const result = await render({ target: ref.current || document.querySelector('#loginContent'), height: 518, width: 782 });
            if (result.success) {
              await refreshToken();
            }
            props.onSuccess()
          } catch(e) {
            props.onError(e);
          }
        })()
      }
    }, 1000)
  }, [ref.current]);

  return (
    <Dialog visible footer={false} onClose={() => {props.onError()}}>
      <div style={{height: 578, width: 782, paddingTop: 20, overflow: 'hidden'}}>
        <div ref={ref} id="loginContent" ></div>
        <div style={{textAlign: 'center', width: 782, fontSize: 13}}>
          <span >{messages['login_prefix']}</span>
          <a href="#" onClick={() => { window.location.reload()}}>{messages['login_action']}</a>
          <span >{messages['login_suffix']}</span>
        </div>
      </div>
    </Dialog>
  )
}

const requestAgain = async (response: AxiosResponse) =>  {
  const reqData = new URLSearchParams(response.config.data);
  reqData.set('sec_token', getSecToken())
  const newResponse = await axios.request({
    method: 'post',
    url: response.config.url,
    baseURL: '/',
    data: reqData.toString()
  });
  return newResponse;
}

let loginPromise: Promise<void> = null;

const fastLoginWithDialog = () => {
  if (loginPromise) {
    return loginPromise;
  }

  loginPromise = new window.Promise<void>((resolve, reject) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(
      <LoginContent
        onSuccess={async () => {
          try {
            setTimeout(async() => {
              resolve()
              ReactDOM.unmountComponentAtNode(div);
            }, 200)
          } catch (e) {
            reject(e);
          }
        }}
        onError={() => {
          ReactDOM.unmountComponentAtNode(div);
          reject();
        }}
      />, div);
  })

  loginPromise.finally(() => {
    loginPromise = null;
  });

  return loginPromise;
}

export const login = async (response: AxiosResponse) => {
  try {
    await fastLoginWithDialog();
    return await requestAgain(response)
  } catch (e) {
    return response;
  }
}
