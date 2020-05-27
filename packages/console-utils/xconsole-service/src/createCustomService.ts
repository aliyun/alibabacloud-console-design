import request from './request'

export interface IOptions {
  apiType?: string;
  ignoreError?: boolean;
  description?: any;
  useCors?: boolean;
  risk?: any;
}

const defaultOptions = {
  apiType: 'open',
  ignoreError: true,
  description: null,
  useCors: false,
  data: {},
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
  options: IOptions = {},
) => {
  const opts = {
    ...defaultOptions,
    ...options,
  };

  // @ts-ignore
  return params => request({
    ...opts,
    data: {
      ...opts.data,
      ...params,
    },
    apiType: 'custom',
    risk: opts.risk,
  });
}
