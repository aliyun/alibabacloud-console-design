import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiType } from './const/index';

export * from './const/index';

export interface IOptionsData {
  product?: string;
  action?: string;
  actions?: string | Actions;
  [key: string]: any;
}

export type Action = {
  action: string;
  params: {
    RegionId: string;
    InstanceId: string;
  };
};

export type Actions = Action[];

export type Risk = {
  code?: {
    [key: string]: string;
  };
  url?: {
    [key: string]: string;
  };
};

export interface IOptions extends AxiosRequestConfig {
  apiType?: ApiType;
  fastLogin?: boolean;
  ignoreError?: boolean;
  description?: any;
  useCors?: boolean;
  data?: IOptionsData;
  risk?: Risk;
  url?: string;
  baseURL?: string;
  method?: AxiosRequestConfig['method'];
  requestStartTime?: number;
  originParams?: any;
  originData?: any;
  region?: string;
  rawResponseData?: boolean;
  extraData?: any;
  /**
   * 在请求失败的时候不 throw Error 而是直接返回请求对象
   */
  disableThrowResponseError?: boolean;
  throwDoubleConfirmError?: boolean;
  // mock 配置
  mock?: boolean;
  // oneapi _tag
  mockTag?: string;
  // 关闭 oneConsole 风控
  noRisk?: boolean;
}

export interface IResponseData<D = any> {
  code?: string;
  withFailedRequest?: boolean;
  message?: string;
  data: D;
  [key: string]: any;
}

export interface IResponse<D = any> extends AxiosResponse<D> {
  config: IOptions;
  data: D;
}

export interface IError {
  stack?: string;
  response?: any;
  message: string;
  title?: string;
  code?: string;
  requestId?: string;
  details?: {
    url?: string;
    params?: any;
    method?: string;
    body?: any;
  };
  detailsAuth?: Record<string, string>;
}

export type Service<R, P> = (params?: P, overlap?: boolean) => Promise<R>;

export type RequestInterceptor = (options: IOptions) => AxiosRequestConfig;

export type ResponseInterceptor = (response: IResponse) => IResponse;
