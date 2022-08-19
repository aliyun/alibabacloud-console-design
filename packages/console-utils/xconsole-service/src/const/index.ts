import { ApiType } from './enum';

export * from './enum';

export const ALIYUN_CONSOLE_CONFIG = 'ALIYUN_CONSOLE_CONFIG';
export const RISK_INFO = 'RISK_INFO';
export const SEC_TOKEN = 'SEC_TOKEN';
export const REGION_COOKIE_NAME = 'activeRegionId';
export const CURRENT_REGION_COOKIE_NAME = 'currentRegionId';
export const LOCALE = 'LOCALE';

export const DEFAULT_RISK_OPTION = {
  apiType: ApiType.open,
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

// One-console 各类接口 url 映射表
export const API_URL: { [key: string]: string[] } = {
  [ApiType.plugin]: ['data/plugin.json', 'data/multiPluginApi.json'],
  [ApiType.inner]: ['data/innerApi.json', 'data/multiInnerApi.json'],
  [ApiType.app]: ['data/call.json', 'data/multiCall.json'],
  [ApiType.open]: ['data/api.json', 'data/multiApi.json'],
  [ApiType.roa]: ['data/api.json', 'data/multiApi.json'],
  [ApiType.roaInner]: ['data/innerApi.json', 'data/multiInnerApi.json'],
};