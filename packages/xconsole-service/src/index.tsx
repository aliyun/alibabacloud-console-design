// export origin createService 
export { default as createService } from './createService';

// export api Client
export { default as createApiClient } from './client';

// export consoleConfig utils
export {
  getConsoleConfig,
  getGlobalVariable,
  getLocale,
  getUmid,
  getActiveRegionId,
  getCollina,
  getRiskInfo,
  getSecToken,
  setGetRegionIdFn,
} from './utils';

// export reqeust
export { default as request } from './request';

// 和 2.x 一样的导出
export { default as defaultAxiosRequest } from './request';

// export interceptors
export { default as consoleRequestInterceptor } from './interceptors/consoleRequestInterceptor';
export { default as searchParamsInterceptor } from './interceptors/searchParamsInterceptor';
export { default as consoleRiskInterceptor } from './interceptors/consoleRiskInterceptor';
export { default as consoleResponseInterceptor } from './interceptors/consoleResponseInterceptor';