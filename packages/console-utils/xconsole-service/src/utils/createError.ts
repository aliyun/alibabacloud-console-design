import { FetcherError } from '@alicloud/console-fetcher';

/**
 * create Error which used in errorPrompt
 * @param error 
 * @param response 
 */
const createError = (_error: FetcherError) => {
  const error: Record<string, any> = { ..._error };
  const { responseData } = error;
  if (!responseData) return error;

  error.response = responseData;
  error.code = responseData.data?.code;
  error.requestId = responseData.data?.requestId;
  error.message = responseData.data?.message;
  error.details = {
    url: error.config.url,
    body: responseData,
    method: error.config.method
  };

  const accessDeniedDetail = responseData.data?.accessDeniedDetail;

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

  return error;
};

export default createError