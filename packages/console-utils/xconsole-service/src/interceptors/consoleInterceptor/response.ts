/* eslint-disable @typescript-eslint/no-throw-literal */
import qs from 'qs';
import { IError, IResponse, IResponseData } from '../../types';
import { ApiType } from '../../const/index';
import { AxiosResponse } from 'axios';

const injectErrorPromptAdaptor = (error: IError, response: AxiosResponse) => {
  let body = {};

  try {
    body = qs.parse(response?.config?.data)
  } catch (e){
    //  nothing
  }

  error.response = response;
  error.code = response.data?.code;
  error.requestId = response.data?.requestId;
  error.message = response.data?.message;
  error.details = {
    url: response?.config?.url,
    body: body,
    method: response?.config?.method
  };

  const accessDeniedDetail = response.data?.accessDeniedDetail;

  if (accessDeniedDetail) {
    const {
      AuthAction: action,
      AuthResource: resource,
      AuthPrincipalType: userType,
      AuthPrincipalOwnerId: userId,
      AuthPrincipalDisplayName: userName,
      PolicyType: policyType,
      NoPermissionType: type,
    } = accessDeniedDetail;

    error.detailsAuth = {
      action,
      resource,
      userType,
      userName,
      userId,
      policyType,
      type,
    };
  }
};

function consoleResponseInterceptor(
  response: IResponse<IResponseData>
): IResponse<IResponseData> {
  const {
    data: apiResponseData,
    config: { apiType, ignoreError, disableThrowResponseError, risk = {} },
  } = response;

  if (apiType === ApiType.custom) return response;

  // Single api succeeded -> code 200, withFailedRequest undefined
  // Multi api succeeded  -> code 200, withFailedRequest false
  if (apiResponseData.code === '200' && apiResponseData.withFailedRequest !== true ) {
    return response;
  }

  // 对于风控直接返回请求对象
  const { code = {} } = risk;
  if (apiResponseData.code === code.doubleConfirm) {
    return response;
  }

  let error: IError = new Error('OpenAPI failed without a message.');

  // Multi api with failed request 
  if (apiResponseData.code === '200' && apiResponseData.withFailedRequest === true ) {
    error = new Error('Multi OpenAPI calls with failed request.');
  }

  // Single api failed with an error message
  if (apiResponseData.message) {
    error = new Error(apiResponseData.message);
  }

  // 适配 error-proxy
  injectErrorPromptAdaptor(error, response);

  // 历史有个 ignoreError 的配置 已经被 deprecate 掉了，为了兼容历史逻辑。本身是 widget 里面给弹窗使用的
  // 新的参数都是 disableThrowResponseError, 在设置了 disableThrowResponseError 会不 throw error
  if (!disableThrowResponseError && ignoreError !== true) {
    throw error;
  }

  response.config.rawResponseData = disableThrowResponseError;

  return response;
}

export default consoleResponseInterceptor;
