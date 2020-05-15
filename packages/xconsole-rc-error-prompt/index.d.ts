interface IFnReturn {
  (error: Error): Promise<void>;
}

interface IErrorDetails {
  code?: string;
  request_id?: string;
  method?: string;
  url?: string;
  params?: object;
  body?: object;
}

interface ISettings {
  locale?: string;
  messages?: {
    [k: string]: string;
  };
  ignoredParamKeys?: string[];
  ignoredBodyKeys?: string[];
  requestIdPriorToCode?: boolean;
  shouldIgnore?: (err: Error) => boolean | undefined;
  getCode?: (err: Error) => string | undefined;
  getRequestId?: (err: Error) => string | undefined;
  getRequestUrl?: (err: Error) => string | undefined;
  getRequestMethod?: (err: Error) => string | undefined;
  getRequestParams?: (err: Error) => string | undefined;
  getRequestBody?: (err: Error) => string | undefined;
  getRequestExtra?: (err: Error) => string | undefined;
  getTitle?: (err: Error, details: IErrorDetails) => string | undefined;
  getMessage?: (err: Error, details: IErrorDetails) => string | undefined;
  getConfirm?: (err: Error, details: IErrorDetails) => string | undefined;
  getCancel?: (err: Error, details: IErrorDetails) => string | undefined;
  onConfirm?: (err: Error) => boolean | undefined;
  onCancel?: (err: Error) => boolean | undefined;
}

export default function (settings?: ISettings): IFnReturn;
