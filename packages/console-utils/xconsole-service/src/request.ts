import axios, { AxiosInstance } from 'axios';
import searchParamsInterceptor from './interceptors/paramsInterceptor/index';
import consoleMockInterceptor from './interceptors/mockInterceptor/index';
import {
  consoleRequestInterceptor,
  consoleResponseInterceptor,
  roaRequestInterceptor
} from './interceptors/consoleInterceptor/index';
import consoleRiskInterceptor from './interceptors/riskInterceptor/index';
import {
  armsRequestInterceptor,
  armsResponseInterceptor,
} from './interceptors/armsInterceptor/index';
import { RequestInterceptor, ResponseInterceptor } from './types';

interface IInterceptors {
  request?: RequestInterceptor[];
  response?: ResponseInterceptor[];
}

export default function createRequest(
  interceptors: IInterceptors = {},
  override?: boolean
): AxiosInstance {
  const instance = axios.create();
  const {
    request: requestInterceptors = [],
    response: responseInterceptors = [],
  } = interceptors;

  // todo
  if (!override) {
    instance.interceptors.request.use(searchParamsInterceptor);
    instance.interceptors.request.use(consoleMockInterceptor);
    instance.interceptors.request.use(consoleRequestInterceptor);
    instance.interceptors.request.use(roaRequestInterceptor);
    instance.interceptors.request.use(armsRequestInterceptor);

    instance.interceptors.response.use(armsResponseInterceptor);
    instance.interceptors.response.use(consoleResponseInterceptor);
    instance.interceptors.response.use(consoleRiskInterceptor);
  }

  let requestInterceptor = requestInterceptors.shift();
  let responseInterceptor = responseInterceptors.shift();

  while (requestInterceptor) {
    instance.interceptors.request.use(requestInterceptor);
    requestInterceptor = requestInterceptors.shift();
  }

  while (responseInterceptor) {
    instance.interceptors.response.use(responseInterceptor);
    responseInterceptor = responseInterceptors.shift();
  }

  return instance;
}
