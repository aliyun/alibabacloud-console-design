import Cookies from 'js-cookie';

const ALIYUN_CONSOLE_CONFIG = 'ALIYUN_CONSOLE_CONFIG';
const RISK_INFO = 'RISK_INFO';
const SEC_TOKEN = 'SEC_TOKEN';
const REGION_COOKIE_NAME = 'activeRegionId';
const CURRENT_REGION_COOKIE_NAME = 'currentRegionId';
const LOCALE = 'LOCALE';

export const getGlobalVariable = (varibaleName) => {
  if (typeof varibaleName === 'undefined') {
    throw new Error('VariableName must be provided');
  }
  if (typeof varibaleName !== 'string') {
    throw new TypeError(
      `expect varibaleName to be a string,
      but actually got: ${typeof varibaleName}`
    );
  }
  return window[varibaleName];
};

export const getConsoleConfig = (key) => {
  if (typeof key === 'undefined') {
    throw new Error('Config key must be provided');
  }

  const config = getGlobalVariable(ALIYUN_CONSOLE_CONFIG);
  return config && config[key];
};

export const getRiskInfo = () => {
  const riskInfo = getGlobalVariable(RISK_INFO);
  return riskInfo || {};
};

export const getSecToken = function() {
  return getConsoleConfig(SEC_TOKEN);
};

export const getUmid = function() {
  const riskInfo = getRiskInfo();
  return riskInfo.UMID;
};

export const getCollina = function() {
  const riskInfo = getRiskInfo();
  if (typeof riskInfo.GETUA === 'function') {
    return riskInfo.GETUA() || 'Fake collina generated in [getCollina]';
  }
};

export const getLocale = function() {
  return getConsoleConfig(LOCALE);
};

let getRegionId = null;

export const setGetRegionIdFn = (fn) => {
  getRegionId = fn;
}

export const getActiveRegionId = function() {
  const regionIdFromCookie = Cookies.get(REGION_COOKIE_NAME) || Cookies.get(CURRENT_REGION_COOKIE_NAME) || 'cn-hangzhou';
  return  getRegionId ? getRegionId() : regionIdFromCookie;
};