import { ApiType } from '../../const/index';
import { IResponse, IResponseData } from '../../types';
import { login } from './login';


async function fastLoginInterceptor(response: IResponse<IResponseData> ): Promise<IResponse<IResponseData>> {
  const { data: responseData, config } = response;
  const { apiType } = config;

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
