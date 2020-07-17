import URLSearchParams from '@ungap/url-search-params';
import { IOptions } from '../../types';
import { ApiType } from '../../const';

export { URLSearchParams };

// This is an axios request interceptor
// By using this interceptor, user can transform normal JavaScript data object
// into an URLSearchParams instance
function searchParamsInterceptor(config: IOptions): IOptions {
  // Take out the request params
  const { params, data, apiType } = config;
  if (apiType === ApiType.custom) return config;

  function transform(target: any = {}): URLSearchParams {
    const searchParams = new URLSearchParams();
    // Iterate over request data and append them to searchParams
    Object.keys(target).forEach((key) => {
      const value = target[key];
      if (typeof value !== 'undefined') {
        searchParams.append(key, value);
      }
    });
    return searchParams;
  }

  const paramsSearchParams = transform(params);
  const dataSearchParams = transform(data);

  // Return the new config
  return {
    ...config,
    params: paramsSearchParams,
    data: dataSearchParams,
    originParams: params,
    originData: data,
  };
}

export default searchParamsInterceptor;
