import docCookies from './docCookies';
import {
  ALIYUN_CONSOLE_CONFIG,
  RISK_INFO,
  SEC_TOKEN,
  REGION_COOKIE_NAME,
  CURRENT_REGION_COOKIE_NAME,
  LOCALE,
} from '../const/index';

export const getGlobalVariable = (varibaleName?: string): any => {
  if (typeof varibaleName === 'undefined') {
    throw new Error('VariableName must be provided');
  }
  if (typeof varibaleName !== 'string') {
    throw new TypeError(
      `expect varibaleName to be a string,
      but actually got: ${typeof varibaleName}`
    );
  }
  return (window as { [key: string]: any })[varibaleName];
};

export const getConsoleConfig = (key: string): any => {
  if (typeof key === 'undefined') {
    throw new Error('Config key must be provided');
  }

  const config = getGlobalVariable(ALIYUN_CONSOLE_CONFIG);
  return config && config[key];
};

export const getRiskInfo = (): any => {
  const riskInfo = getGlobalVariable(RISK_INFO);
  return riskInfo || {};
};

export const getSecToken = (): any => {
  return getConsoleConfig(SEC_TOKEN);
};

export const getUmid = (): string => {
  const riskInfo = getRiskInfo();
  return riskInfo.UMID;
};

export const getCollina = (): string => {
  const riskInfo = getRiskInfo();
  if (typeof riskInfo.GETUA === 'function') {
    return riskInfo.GETUA() || 'Fake collina generated in [getCollina]';
  }
  return '';
};

export const getLocale = (): string => {
  return getConsoleConfig(LOCALE);
};

let getRegionId = null;

// 为了设置能够从获取内存中保存的 region ID
// 这个函数是提供给 xconsole 设置从 react-router 中获取的 regionId
export const setGetRegionIdFn = (fn) => {
  getRegionId = fn;
}

export const getActiveRegionId = function() {
  const regionIdFromCookie = (
    docCookies.getItem(REGION_COOKIE_NAME) ||
    docCookies.getItem(CURRENT_REGION_COOKIE_NAME) ||
    'cn-hangzhou'
  );
  return getRegionId ? getRegionId() : regionIdFromCookie;
};
