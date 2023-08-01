import { FetcherError } from '@alicloud/console-fetcher';

/**
 * create Error which used in errorPrompt
 * @param error 
 * @param response 
 */
const createError = (_error: FetcherError) => {
  const error: Record<string, any> = { ..._error };
  const { responseData, config } = error;
  if (!responseData) return error;

  // 转换成 axiosError 格式
  error.response = {
    ...responseData,
    data: responseData,
    config,
  };
  error.code = responseData?.code;
  error.requestId = responseData?.requestId;
  error.message = responseData?.message;
  error.details = {
    url: config.url,
    body: responseData,
    method: config.method
  };

  const accessDeniedDetail = responseData?.accessDeniedDetail;

  if (accessDeniedDetail) {
    const {
      AuthAction: action,
      AuthResource: resource,
      AuthPrincipalType: userType,
      AuthPrincipalOwnerId: userId,
      AuthPrincipalDisplayName: userName,
      PolicyType: policyType,
      NoPermissionType: type,
      EncodedDiagnosticMessage: diagnosisInfo,
    } = accessDeniedDetail;

    error.detailsAuth = {
      action,
      resource,
      userType,
      userName,
      userId,
      policyType,
      type,
      diagnosisInfo
    };
  }

  return error;
};

export default createError