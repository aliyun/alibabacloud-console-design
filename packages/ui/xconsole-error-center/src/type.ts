import { ReactElement } from 'react';
import { AxiosResponse } from 'axios';

export type ErrorPrompt = <T>(err: string | ReactElement | IErrorWithDetails | IErrorDetailedInfo) => Promise<T>;

export interface IErrorDetails {
  code?: string;
  requestId?: string;
  url?: string;
  method?: string;
  params?: string | Record<string, unknown> | null;
  body?: string | Record<string, unknown> | null;
  [k: string]: unknown;
}

export interface IErrorWithDetails extends Error {
  details?: IErrorDetails;
}

export interface IErrorDetailedInfo extends IErrorDetails {
  message?: string | ReactElement;
}

export type ErrorCodeConfigCallback = (error: ResponseError) => Partial<ErrorCodeConfig>;

export interface ErrorCodeConfig {
  // 弹窗标题
  title: string;
  // 弹窗信息，默认值为 error.message
  message: string;
  // 确定按钮文案
  confirmLabel: string;
  // 点击确定跳转的链接
  confirmHref: string;
  // 取消按钮文案
  cancelLabel: string;
  // 点击取消跳转的链接
  cancelHref: string;
  // 关闭详情
  disableExtraInfo?: boolean;
  // 只展示一个按钮
  dialogType?: 'alert';

  target?: '_blank' |  undefined;

  ignore?: boolean;
}

export interface ErrorCodeConfigMap {
  [key: string]: Partial<ErrorCodeConfig>;
}

export interface BaseResponse<T> {
  code: string;
  data: T;
  message: string;
  httpStatusCode: string;
  requestId: string;
  successResponse: boolean;
}

export interface ResponseError<T = any> extends Error {
  response?: AxiosResponse<BaseResponse<T>>;
}

export type GetMessageCallback = (code: string, msg: string, error: ResponseError) => string;

export interface ErrorPromptOption {
  errorConfig?: Partial<ErrorCodeConfig>;
  getMessage?: GetMessageCallback;
  disableExtraInfo?: boolean;
  dialogType?: 'alert' | 'prompt';
}

export interface ErrorCenterOption {
  enable?: boolean;
  errorCode?: ErrorCodeConfigMap;
  errorCodes?: ErrorCodeConfigMap;
  errorConfig?: ErrorCodeConfigCallback;
  getMessage?: GetMessageCallback;
  disableExtraInfo?: boolean;
  dialogType?: 'alert' | 'prompt';
  showCopy?: boolean;
}