import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import createRequest from './request';
import chunk from 'lodash/chunk'
import { DEFAULT_RISK_OPTION } from './const'
import { IOptions, IResponseData, Service, Actions } from './types';

export const request = createRequest();

const makeOption = (product: string, actions: Actions, opts: IOptions): AxiosRequestConfig => {
  return {
    ...opts,
    data: opts.data
      ? opts.data
      : {
        product,
        actions,
      },
    apiType: opts.apiType,
    ignoreError: opts.ignoreError,
    description: opts.description,
    risk: opts.risk,
  } as AxiosRequestConfig;
}

const splitActions = (actions: Actions) => chunk(actions, 20)

const createMultiService = <R, P>(requestInstance: AxiosInstance, product: string, opts: IOptions) => {
  return async (actions: Actions): Promise<R> => {
    /* eslint-disable no-undef */
    return Promise.all(splitActions(actions).map((splitAction) => {
      return requestInstance.request<IResponseData<R>, AxiosResponse<IResponseData<R>>>(
        makeOption(product, splitAction, opts)
      );
    })).then((data) => {
      return data.reduce((pre, d) => ({...pre, ...(d.data.data)}), {} as R)
    });
  };
}

const createDefaultService = <R, P>(requestInstance: AxiosInstance, product: string, action: string, opts: IOptions) => {
  return async (params: P, overlap = false) => {
    let data: IOptions['data'] = {
      product,
      action,
      params,
    };

    if (opts.data) {
      data = overlap
        ? {
          product,
          action,
          ...opts.data,
          params: params || {
            ...(opts.data.params || {}),
            ...(params || {}),
          },
        }
        : {
          ...opts.data,
          params,
        };
    }

    if (opts.extraData) {
      data = {
        ...data,
        ...opts.extraData
      }
    }

    const res = await requestInstance.request<IResponseData<R>, AxiosResponse<IResponseData<R>>>({
      ...opts,
      data,
      apiType: opts.apiType, // one-console 对应的接口类型
      ignoreError: opts.ignoreError, // 是否忽略 api 异常
      description: opts.description || action, // 当前请求的描述
      useCors: false,
      risk: opts.risk,
    } as AxiosRequestConfig);

    //@ts-ignore
    return res.config.rawResponseData ? res.data : res.data.data;
  };
}


const createService = <R = any, P = any>(
  product: string,
  action?: string,
  options: IOptions = {},
  instance?: AxiosInstance
): Service<R, P> => {
  const requestInstance = instance || request;
  const opts: IOptions = {
    ...DEFAULT_RISK_OPTION,
    ...options,
  };

  if (!action) {
    // @ts-ignore
    return createMultiService<R, P>(requestInstance, product, options);
  }

  // @ts-ignore
  return createDefaultService(requestInstance, product, action, opts)
}

export default createService;
