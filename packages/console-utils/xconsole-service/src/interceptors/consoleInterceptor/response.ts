/* eslint-disable @typescript-eslint/no-throw-literal */
import { IError, IResponse, IResponseData } from '../../types';
import { ApiType } from '../../const/index';

function consoleResponseInterceptor(
  response: IResponse<IResponseData>
): IResponse<IResponseData> {
  const {
    data: apiResponseData,
    config: { apiType, ignoreError },
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
  if (
    // Multi api with failed request
    apiResponseData.code === '200' &&
    apiResponseData.withFailedRequest === true
  ) {
    const error: IError = new Error('Multi OpenAPI calls with failed request.');
    error.response = response;
    if (ignoreError !== true) {
      throw error;
    }
    return response;
  }
  if (apiResponseData.message) {
    // Single api failed with an error message
    const error: IError = new Error(apiResponseData.message);
    error.response = response;
    if (ignoreError !== true) {
      throw error;
    }
    return response;
  }
  // Single api failed without an error message
  const error: IError = new Error('OpenAPI failed without a message.');
  error.response = response;
  if (ignoreError !== true) {
    throw error;
  }
  return response;
}

export default consoleResponseInterceptor;
