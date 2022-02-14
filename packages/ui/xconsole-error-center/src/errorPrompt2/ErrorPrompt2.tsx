import isFunction from 'lodash/isFunction';
import errorPrompt from '@alicloud/console-base-error-prompt-proxy';

import {
  ResponseError, ErrorCodeConfig,
  GetMessageCallback, ErrorCodeConfigCallback
} from '../type';

interface ShowErrorOption {
  error: ResponseError;
  errorConfig?: Partial<ErrorCodeConfig> | ErrorCodeConfigCallback;
  getMessage?: GetMessageCallback;
}

const getRealMessage = (error: ResponseError, errorConfig: Partial<ErrorCodeConfig>, getMessage?: GetMessageCallback) => {
  if (errorConfig.message) {
    if (isFunction(errorConfig.message)) {
      return errorConfig.message(error);
    }
    return errorConfig.message;
  }

  const code = error?.response?.data?.code || 'UNKNOWN_ERROR';
  const errorMessage = error?.response?.data?.message || error.message || error?.response?.data?.code;
  if (getMessage) {
    return getMessage(code, errorMessage, error)
  }

  return errorMessage;
}

const getErrorConfig = (
  errorConfig: Partial<ErrorCodeConfig> | ErrorCodeConfigCallback | undefined,
  error: ResponseError,
  getMessage?: GetMessageCallback
) => {

  if (isFunction(errorConfig)) {
    return errorConfig(error)
  }

  return {
    ...errorConfig,
    message: getRealMessage(error, errorConfig || {}, getMessage)
  };
}


const processError = (errorConfig: Partial<ErrorCodeConfig>, error: ResponseError) => {
  return {
    name: error.name,
    message: errorConfig.message,
    title: errorConfig.title,
    requestId: error?.response?.data.requestId,
    details: {
      url: error?.response?.config.url,
      method: error?.response?.config?.method,
      params: error?.response?.config?.params,
      ...(error?.details || {})
    },
    code: error?.response?.data?.code,
    stack: error.stack,
  }
}

const errorPrompt2 = (option: ShowErrorOption) => {
  const { error, getMessage } = option;
  const code = error?.response?.data?.code;
  const errorConfig = getErrorConfig(option.errorConfig, error, getMessage);

  if(process.env.NODE_ENV === 'development' && (errorConfig.cancelLabel || errorConfig.cancelHref)) {
    console.warn(`[XConsole error-center]: cancelLabel and cancelHref will be ignored`)
  }

  if (errorConfig.ignore || code === 'FoundRiskAndDoubleConfirm') {
    return;
  }

  return errorPrompt(processError(errorConfig, error), {
    title: errorConfig.title,
    button: errorConfig.confirmLabel && {
      href: errorConfig.confirmHref,
      children: errorConfig.confirmLabel,
    }
  })
}

export default errorPrompt2;