import docCookies from './docCookies';
import {
  ALIYUN_CONSOLE_CONFIG,
  RISK_INFO,
  SEC_TOKEN,
  REGION_COOKIE_NAME,
  CURRENT_REGION_COOKIE_NAME,
  LOCALE,
} from '../const';

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

export const getActiveRegionId = (): string => {
  return (
    docCookies.getItem(CURRENT_REGION_COOKIE_NAME) ||
    docCookies.getItem(REGION_COOKIE_NAME) ||
    'cn-hangzhou'
  );
};
