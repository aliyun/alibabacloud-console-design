import fastLogin from '@alicloud/console-fastlogin';
import { IResponse, IResponseData } from '../../types';
import { ApiType } from '../../const/index';

async function consoleRiskInterceptor(
  response: IResponse<IResponseData>
): Promise<IResponse<IResponseData>> {
  const {
    data: responseData,
    config: { apiType, throwDoubleConfirmError },
  } = response;

  if (apiType === ApiType.custom) return response;

  switch (responseData.code) {
    case 'CONSOLE_NEED_LOGIN':
      try {
        const newResponse = await fastLogin.open()
        return newResponse;
      } catch (e) {
        if (throwDoubleConfirmError) {
          e.response = response;
          throw e;
        }
        return response;
      }
    default:
      return response;
  }
}

export default consoleRiskInterceptor;
