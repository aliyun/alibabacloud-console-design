import { IOptions } from '../../types';
import { ApiType } from '../../const/index';

/**
 * Axios intercetor
 * One-console request pre-processor
 * @param {*} config
 */
function consoleRequestInterceptor(config: IOptions): IOptions {
  const { apiType } = config;

  // httpApi 与 roaApi 的使用方式一致
  if (apiType !== ApiType.roa && apiType !== ApiType.roaInner && apiType !== ApiType.http) {
    return config;
  }

  config.data = {
    ...config.data,
    params: config?.data?.params?.params,
    content: JSON.stringify(config?.data?.params?.content),
  };
  return config;
}

export default consoleRequestInterceptor;
