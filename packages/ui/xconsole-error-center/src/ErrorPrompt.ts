import isFuntion from 'lodash/isFunction';
import errorPrompt from '@alicloud/xconsole-rc-error-prompt';
import pick from 'lodash/pick'
import {
  ConsoleNeedLogin, PostonlyOrTokenError
} from './constants'
import { LOCALE, intl } from './utils';
import {
  ResponseError, ErrorCodeConfig,
  GetMessageCallback, ErrorCodeConfigCallback
} from './type';

interface ShowErrorOption {
  error: ResponseError;
  errorConfig?: Partial<ErrorCodeConfig> | ErrorCodeConfigCallback;
  getMessage?: GetMessageCallback;
  disableExtraInfo?: boolean;
  dialogType?: 'alert' | 'prompt';
}


const getRealMessage = (error: ResponseError, errorConfig: Partial<ErrorCodeConfig>, getMessage?: GetMessageCallback) => {

  if (errorConfig.message) {
    if (isFuntion(errorConfig.message)) {
      return errorConfig.message(error);
    }
    return errorConfig.message;
  }

  const code = error?.response?.data?.code || 'UNKNOWN_ERROR';
  const errorMessasge = error?.response?.data?.message || error.message;
  if (getMessage) {
    return getMessage(code, errorMessasge, error)
  }

  return errorMessasge;
}

const getErrorConfig = (
  errorConfig: Partial<ErrorCodeConfig> | ErrorCodeConfigCallback | undefined,
  error: ResponseError,
  getMessage?: GetMessageCallback
) => {

  if (isFuntion(errorConfig)) {
    return errorConfig(error)
  }

  return {
    ...errorConfig,
    message: getRealMessage(error, errorConfig || {}, getMessage)
  };
}

const showError = (option: ShowErrorOption) => {
  const { error, disableExtraInfo, dialogType, getMessage } = option;

  const errorConfig = getErrorConfig(option.errorConfig, error, getMessage);
  
  const code = error?.response?.data?.code;

  const errorPromptConfig = {
    locale: LOCALE,
    shouldIgnore: () => {
      return code === 'FoundRiskAndDoubleConfirm'
    },
    getTitle() {
      if (errorConfig) {
        return intl(errorConfig.title)
      }
      return intl(code, 'Error Notice')
    },
    getMessage() {
      return errorConfig?.message;
    },
    getRequestId() {
      return error?.response?.data.requestId;
    },
    getRequestUrl() {
      return error?.response?.config.url;
    },
    getRequestMethod() {
      return error?.response?.config?.method;
    },
    getRequestParams() {
      return error?.response?.config?.params;
    },
    getConfirm() {
      if (errorConfig) {
        return errorConfig.confirmLabel
      }
    },
    getCancel() {
      if (errorConfig) {
        return errorConfig.cancelLabel
      }
    },
    getRequestBody(err: Error) {
      const keys = ['region', 'product', 'action', 'params'];
      // @ts-ignore
      return pick(err.response?.config?.originData, keys)
    },
    getRequestExtra(err: ResponseError) {
      return {
        RESPONSE: err.response?.data
      };
    },
    onConfirm() {
      // 如果错误码指定了重定向地址，则页面重定向到指定地址上
      if (errorConfig && errorConfig.confirmHref) {
        const redirectUrl = errorConfig.confirmHref
        window.location.href = redirectUrl
        return false
      }

      // 同意对 NeedLogin 默认处理，直接刷新页面，让 OneConsole 层去进行登录 redirect
      if (code === ConsoleNeedLogin || code === PostonlyOrTokenError) {
        window.location.reload();
        return false;
      }
    },
    onCancel() {
      // 重定向
      if (errorConfig && errorConfig.cancelHref) {
        const redirectUrl = errorConfig.cancelHref
        window.location.href = redirectUrl
        return false
      }
    },
    disableDetials: disableExtraInfo,
    disableCancelBtn: (
      dialogType === 'alert' && !(code === ConsoleNeedLogin || code === PostonlyOrTokenError)
    )
  };

  // @ts-ignore
  return errorPrompt(errorPromptConfig)(error)
}


export default showError;