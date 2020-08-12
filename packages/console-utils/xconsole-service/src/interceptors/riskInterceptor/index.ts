import handleDoubleConfirm from './handleDoubleConfirm';
import { IResponse, IResponseData } from '../../types';
import { ApiType } from '../../const/index';

async function consoleRiskInterceptor(
  response: IResponse<IResponseData>
): Promise<IResponse<IResponseData>> {
  const {
    data: responseData,
    config: { apiType },
  } = response;

  if (apiType === ApiType.custom) return response;

  const {
    config: { risk = {} },
  } = response;

  if (!risk) {
    return response;
  }
  const { code = {} } = risk;
  switch (responseData.code) {
    case code.doubleConfirm:
      try {
        const newResponse = await handleDoubleConfirm(response);
        return newResponse;
      } catch (e) {
        console.error('[handleDoubleConfirm] failed: ', e.message);
        return response;
      }
    case code.forbidden:
      return response;
    default:
      return response;
  }
}

export default consoleRiskInterceptor;
