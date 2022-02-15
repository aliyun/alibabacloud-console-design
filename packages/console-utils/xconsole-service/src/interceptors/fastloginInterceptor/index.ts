import { ApiType } from '../../const/index';
import defaultConfig from '../../configuration/config'
import { IResponse, IResponseData } from '../../types';
import { login } from './login';


async function fastLoginInterceptor(response: IResponse<IResponseData> ): Promise<IResponse<IResponseData>> {
  const { data: responseData, config } = response;
  const { apiType, fastLogin } = config;

  // 只在开启了 fastLogin 的站点才显示
  // @ts-ignore
  const fastLoginEnbled = (fastLogin || defaultConfig.fastLogin) && window?.ALIYUN_CONSOLE_CONFIG?.CHANNEL === 'OFFICIAL'
  if(!fastLoginEnbled) {
    return response;
  }

  if (apiType === ApiType.custom) return response;

  if (responseData.code === 'ConsoleNeedLogin') {
    try {
      const newResponse = await login(response); 
      return newResponse;
    } catch(e) {
      return response;
    }
  }

  return response;
}

export default fastLoginInterceptor;
