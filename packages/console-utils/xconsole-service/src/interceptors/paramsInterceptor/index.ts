import qs from 'qs';
import { IOptions } from '../../types';
import { ApiType } from '../../const/index';

// This is an axios request interceptor
// By using this interceptor, user can transform normal JavaScript data object
// into an URLSearchParams instance
function searchParamsInterceptor(config: IOptions): IOptions {
  // Take out the request params
  const { params, data, apiType } = config;
  if (apiType === ApiType.custom) return config;

  const paramsSearchParams = qs.stringify(params);
  const dataSearchParams = qs.stringify(data);

  // Return the new config
  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      'content-type': 'application/x-www-form-urlencoded',
    },
    params: paramsSearchParams,
    data: dataSearchParams,
    originParams: params,
    originData: data,
  };
}

export default searchParamsInterceptor;
