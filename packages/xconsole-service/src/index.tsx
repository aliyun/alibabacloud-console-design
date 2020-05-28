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
} from './utils';

// export reqeust
export { default as request } from './request';

export * from './types';
export * from './const';

// export interceptors
export { default as armsRequestInterceptor } from './interceptors/armsRequestInterceptor';
export { default as armsResponseInterceptor } from './interceptors/armsResponseInterceptor';
export { default as consoleMockInterceptor } from './interceptors/consoleMockInterceptor';
export { default as consoleRequestInterceptor } from './interceptors/consoleRequestInterceptor';
export { default as searchParamsInterceptor } from './interceptors/searchParamsInterceptor';
export { default as consoleRiskInterceptor } from './interceptors/consoleRiskInterceptor';
export { default as consoleResponseInterceptor } from './interceptors/consoleResponseInterceptor';
