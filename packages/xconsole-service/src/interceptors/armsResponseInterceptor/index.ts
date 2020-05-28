import URLSearchParams from '@ungap/url-search-params';
import { IResponse, IResponseData } from '../../types';
import logger from './logger';

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
  const matches = /\/data\/(.+)\.json/.exec(url);
  if (!matches) {
    return response;
  }
  const [targetUrl, targetApiType] = matches;
  let api = targetUrl;
  if (targetApiType.includes('multi')) {
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
  } else {
    api = `${targetUrl}?product=${requestData.get(
      'product'
    )}&action=${requestData.get('action')}`;
  }

  logger({
    api,
    success: isSuccess,
    duration,
    code: apiCode,
    msg,
    startTime,
    traceId,
  });

  return response;
}

export default armsResponseInterceptor;
