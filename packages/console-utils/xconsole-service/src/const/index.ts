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