import * as XconsoleService from '../src/index'

import {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios/index';

const exportsInfo = [
  'createService',
  'createApiClient',
  'getConsoleConfig',
  'getGlobalVariable',
  'getLocale',
  'getUmid',
  'getActiveRegionId',
  'getCollina',
  'getRiskInfo',
  'getSecToken',
  'request',
  'consoleRequestInterceptor',
  'searchParamsInterceptor',
  'consoleRiskInterceptor',
  'consoleResponseInterceptor'
]

const testRequestInterceptor = (config: AxiosRequestConfig) => {
  console.log('config', config);

  return config;
}

const testResponseInterceptor = (response?: AxiosResponse) => {
  console.log('response', response);
  return response;
}

describe('XconsoleService #main', () => {
  it('exports in correct type and elements', () => {
    Object.keys(XconsoleService).forEach((_key) => {
      const serviceFunc = XconsoleService[_key];
      expect(typeof serviceFunc).toBe('function');
      expect(exportsInfo.indexOf(_key)).toBeGreaterThanOrEqual(0);
    })
  })
})

describe('XconsoleService createService', () => {
  it('exports in correct type and elements', () => {
    const fn = XconsoleService.createService;
    const req = XconsoleService.request;

    req.interceptors.request.use(testRequestInterceptor)

    req.interceptors.response.use(testResponseInterceptor)

    const instanceA = fn('a', 'b');
    const instanceB = fn('a');
    const instanceC = fn('a', 'b', {});
    const instanceD = fn('a');
    const r1 = instanceA({});
    console.log(req);
    console.log(instanceB({}))
    console.log(instanceC({}))
    console.log(instanceD({}))
  })
})
