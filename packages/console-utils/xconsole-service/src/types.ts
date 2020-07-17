import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiType } from './const';

export * from './const';

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
  mock?: boolean;
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
  message: any;
}

export type ServicePromise<T> = Promise<T>;

export type Service = <T>(params?: any, overlap?: boolean) => ServicePromise<T>;

export type RequestInterceptor = (options: IOptions) => AxiosRequestConfig;

export type ResponseInterceptor = (response: IResponse) => IResponse;
