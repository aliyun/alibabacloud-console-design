import { IOptions } from '../../types';
import { ApiType } from '../../const/index';

/**
 * Axios intercetor
 * One-console request pre-processor
 * @param {*} config
 */
function consoleRequestInterceptor(config: IOptions): IOptions {
  const { apiType } = config;

  if (apiType !== ApiType.roa) {
    return config;
  }

  config.data = {
    ...config.data,
    params: config?.data?.params?.params,
    content: JSON.stringify(config?.data?.params?.content),
  }
  return config;
}

export default consoleRequestInterceptor;
