import createService from './createService';
import { IOptions, ServicePromise } from './types';
import { ApiType } from './const';

type ClientRequest = <D>(
  product: string,
  action?: string | any[],
  params?: {},
  options?: IOptions
) => ServicePromise<D>;

export default (
  clientOptions: IOptions
): {
  request: ClientRequest;
  innerApi: ClientRequest;
  callApi: ClientRequest;
} => {
  const request: ClientRequest = <D>(
    product: string,
    action?: string | any[],
    params?: any,
    options?: IOptions
  ): ServicePromise<D> => {
    if (typeof action === 'string') {
      return createService(product, action, {
        ignoreError: false,
        ...clientOptions,
        ...options,
        apiType: ApiType.open,
      })<D>(params);
    }
    return createService(product, null, {
      ignoreError: false,
      ...clientOptions,
      ...options,
      apiType: ApiType.open,
    })<D>(action);
  };

  const innerApi: ClientRequest = <D>(
    product: string,
    action?: string | any[],
    params?: any,
    options?: IOptions
  ): ServicePromise<D> => {
    if (typeof action === 'string') {
      return createService(product, action, {
        apiType: ApiType.inner,
        ignoreError: false,
        ...clientOptions,
        ...options,
      })<D>(params);
    }
    return createService(product, null, {
      apiType: ApiType.inner,
      ignoreError: false,
      ...clientOptions,
      ...options,
    })<D>(action);
  };

  const callApi: ClientRequest = <D>(
    product: string,
    action?: string | any[],
    params?: any,
    options?: IOptions
  ): ServicePromise<D> => {
    if (typeof action === 'string') {
      return createService(product, action, {
        apiType: ApiType.app,
        ignoreError: false,
        ...clientOptions,
        ...options,
      })<D>(params);
    }
    return createService(product, null, {
      apiType: ApiType.app,
      ignoreError: false,
      ...clientOptions,
      ...options,
    })<D>(action);
  };

  return {
    request,
    innerApi,
    callApi,
  };
};
