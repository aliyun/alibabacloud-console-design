import URLSearchParams from '@ungap/url-search-params';
import { IResponse, IResponseData } from '../../types';
import logger from '../../utils/logger';

const logArmsForMultiApi = ({targetUrl, traceId, startTime, duration, success, code, msg}, response: IResponse<IResponseData>) => {
  let api = targetUrl;
  const { config, data } = response;
  const { data: dataStr } = config;
  const requestData = new URLSearchParams(dataStr);
  try {
    const actions: { action: string }[] = JSON.parse(
      requestData.get('actions') || '[]'
    );
    let apiIdentifier = '';
    const actionSet: any = {};
    for (const item of actions) {
      if (!actionSet[item.action]) {
        actionSet[item.action] = 1;
      }
    }
    apiIdentifier = Object.keys(actionSet).join(',');
    api = `${targetUrl}?product=${requestData.get(
      'product'
    )}&action=${apiIdentifier}`;
  } catch (err) {
    api = targetUrl;
  }

  // 如果是 mutiapi 一起失败了, 直接上报
  if (!success) {
    logger({ api, success, duration, code, msg, startTime, traceId });
  } else {
    const responseData = (data?.data || {});
    Object.keys(responseData).forEach((key) => {
      const respForSingleApi = responseData[key];
      const { Code } = respForSingleApi;
      const apiWithIdentifier = `${api}&identifier=${key}&requestId=${respForSingleApi.RequestId}`;
      const isSuccess = Code && (Code === '200' || Code === 200);

      logger({ 
        api: apiWithIdentifier, success: isSuccess, duration, code: respForSingleApi.Code,
        msg: respForSingleApi?.Message, startTime, traceId
      });
    })
  }
}


function armsResponseInterceptor(
  response: IResponse<IResponseData>
): IResponse<IResponseData> {
  const { config, data, headers, status } = response;

  // Time
  const { requestStartTime: startTime = Date.now() } = config;
  const endTime = Date.now();
  const duration = endTime - startTime;

  // Trace ID
  const traceId = headers['eagleeye-traceid'];

  // Reponse Data
  let isSuccess;
  let apiCode;
  let msg;
  if (status === 200 && data) {
    const { code, message, successResponse } = data;
    apiCode = code;
    msg = message;
    isSuccess = !!successResponse;
  } else {
    apiCode = status;
    msg = 'Http request failed.';
    isSuccess = false;
  }

  // API
  const { url = '', data: dataStr } = config;
  const requestData = new URLSearchParams(dataStr);
  const matches = /data\/(.+)\.json/.exec(url);
  if (!matches) {
    return response;
  }
  const [targetUrl, targetApiType] = matches;
  let api = targetUrl;
  if (targetApiType.includes('multi')) {
    logArmsForMultiApi({
      targetUrl,
      success: isSuccess,
      duration,
      code: apiCode,
      msg,
      startTime,
      traceId,
    }, response)
  } else {
    api = `${targetUrl}?product=${requestData.get(
      'product'
    )}&action=${requestData.get('action')}`;
    logger({
      api,
      success: isSuccess,
      duration,
      code: apiCode,
      msg,
      startTime,
      traceId,
    });
  }

  return response;
}

export default armsResponseInterceptor;
