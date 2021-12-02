/* eslint-disable @typescript-eslint/no-throw-literal */
import { IError, IResponse, IResponseData } from '../../types';
import { ApiType } from '../../const/index';
import { AxiosResponse } from 'axios';


const injectErrorPromptAdaptor = (error: IError, response: AxiosResponse) => {
  error.response = response;
  error.code = response.data?.code;
  error.requestId = response.data?.requestId;
  error.message = response.data?.message;
  error.details = {
    url: response?.config?.url,
    body: response?.config?.data,
    method: response?.config?.method
  }
};

function consoleResponseInterceptor(
  response: IResponse<IResponseData>
): IResponse<IResponseData> {
  const {
    data: apiResponseData,
    config: { apiType, ignoreError, risk = {} },
  } = response;

  if (apiType === ApiType.custom) return response;

  if (
    // Single api succeeded -> code 200, withFailedRequest undefined
    // Multi api succeeded  -> code 200, withFailedRequest false
    apiResponseData.code === '200' &&
    apiResponseData.withFailedRequest !== true
  ) {
    return response;
  }

  // 对于风控直接返回请求对象
  const { code = {} } = risk;
  if (apiResponseData.code === code.doubleConfirm) {
    return response;
  }

  if (
    // Multi api with failed request
    apiResponseData.code === '200' &&
    apiResponseData.withFailedRequest === true
  ) {
    const error: IError = new Error('Multi OpenAPI calls with failed request.');
    injectErrorPromptAdaptor(error, response);
    if (ignoreError !== true) {
      throw error;
    }
    return response;
  }

  if (apiResponseData.message) {
    // Single api failed with an error message
    const error: IError = new Error(apiResponseData.message);
    injectErrorPromptAdaptor(error, response);
    if (ignoreError !== true) {
      throw error;
    }
    return response;
  }
  // Single api failed without an error message
  const error: IError = new Error('OpenAPI failed without a message.');
  injectErrorPromptAdaptor(error, response);

  if (ignoreError !== true) {
    throw error;
  }

  return response;
}

export default consoleResponseInterceptor;
