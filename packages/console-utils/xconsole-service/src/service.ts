import { AxiosInstance } from 'axios';
import createRequest from './request';
import { IOptions, IResponseData, Service, Actions } from './types';

const defaultOptions = {
  apiType: 'open',
  ignoreError: false,
  description: null,
  useCors: false,
  risk: {
    code: {
      success: '200',
      doubleConfirm: 'FoundRiskAndDoubleConfirm',
      forbidden: 'FoundRiskAndTip',
      verifyCodeInvalid: 'verifyCodeInvalid',
    },
    url: {
      generateVerificationCode: '/risk/sendVerifyMessage.json',
      setVerificationMethod: 'https://account.console.aliyun.com/#/secure',
      changeVerificationMethod: 'https://account.console.aliyun.com/#/secure',
      bindMobileHelp: 'https://account.console.aliyun.com',
    },
  },
};

const request = createRequest();

function createService<D = any, P = any>(
  product: string,
  action?: string,
  options: IOptions = {},
  instance?: AxiosInstance
): Service {
  const requestInstance = instance || request;
  const opts = {
    ...defaultOptions,
    ...options,
  };

  if (!action) {
    // @ts-ignore
    return async <D = any>(actions: Actions): Promise<D> => {
      const res = await requestInstance.request<IResponseData<D>, any>({
        ...opts,
        data: opts.data
          ? opts.data
          : {
              product,
              actions,
            },
        // @ts-ignore
        apiType: opts.apiType,
        ignoreError: opts.ignoreError,
        description: opts.description,
        risk: opts.risk,
      });

      return res.data.data;
    };
  }

  return async <D, P>(params: P, overlap = false): Promise<D> => {
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
    const res = await requestInstance.request<IResponseData<D>, never>({
      ...opts,
      data,
      // @ts-ignore
      apiType: opts.apiType, // one-console 对应的接口类型
      ignoreError: opts.ignoreError, // 是否忽略 api 异常
      description: opts.description || action, // 当前请求的描述
      useCors: false,
      risk: opts.risk,
    });
    // @ts-ignore
    return res.data.data;
  };
}

export default createService;
