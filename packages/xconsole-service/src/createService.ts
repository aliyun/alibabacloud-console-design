import request from './request'

export interface IOptions {
  apiType?: string;
  ignoreError?: boolean;
  description?: any;
  useCors?: boolean;
  data?: any;
  risk?: any;
}

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
  }
}

export default (
  product: string,
  action?: string,
  options: IOptions = {},
) => {
  const opts = {
    ...defaultOptions,
    ...options,
  }
  if (!action) {
    // @ts-ignore
    return actions => request({
      ...opts,
      data: opts.data ? opts.data : {
        product,
        actions,
      },
      apiType: opts.apiType,
      ignoreError: opts.ignoreError,
      description: opts.description,
      risk: opts.risk,
    })
  }
  // @ts-ignore
  return params => request({
    ...opts,
    data: opts.data ? {
      ...opts.data,
      ...params,
    } : {
      product,
      action,
      params,
    },
    apiType: opts.apiType, // one-console 对应的接口类型
    ignoreError: opts.ignoreError, // 是否忽略 api 异常
    description: opts.description || action, // 当前请求的描述
    useCors: false,
    risk: opts.risk,
  })
}