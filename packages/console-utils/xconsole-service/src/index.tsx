export * from '@alicloud/console-fetcher';

export type { ApiType, IOptions as ServiceOptions } from './types';

export * from './hooks/useService';
export * from './oss/index';
export { default as useService } from './hooks/useService';
export { default as createService, request as defaultAxiosRequest } from './service';
export { setGetRegionIdFn } from './utils/index';
export { default as createError } from './utils/createError';
export { default as globalConfig } from './configuration/config';
