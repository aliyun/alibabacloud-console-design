import React from 'react';
import { Balloon, Icon, Message } from '@alicloud/console-components';
import isFunction from 'lodash/isFunction';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
  showCopy?: boolean;
}


const getRealMessage = (error: ResponseError, errorConfig: Partial<ErrorCodeConfig>, getMessage?: GetMessageCallback) => {

  if (errorConfig.message) {
    if (isFunction(errorConfig.message)) {
      return errorConfig.message(error);
    }
    return errorConfig.message;
  }

  const code = error?.response?.data?.code || 'UNKNOWN_ERROR';
  const errorMessasge = error?.response?.data?.message || error.message || error?.response?.data?.code;
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

  if (isFunction(errorConfig)) {
    return errorConfig(error)
  }

  return {
    ...errorConfig,
    message: getRealMessage(error, errorConfig || {}, getMessage)
  };
}

const CopyIcon = ({data}: {data: string}) => {
  return (
    <Balloon align="r" trigger={
      <CopyToClipboard
        text={data}
        onCopy={ () => Message.success('拷贝成功')}
      >
        <Icon type="copy" size="xs" style={{color: "#555", cursor: 'pointer'}}/>
      </CopyToClipboard>
    }>
      点击拷贝详情错误详情
    </Balloon>)
}

const showError = (option: ShowErrorOption) => {
  const { error, disableExtraInfo, dialogType, getMessage, showCopy } = option;

  const errorConfig = getErrorConfig(option.errorConfig, error, getMessage);
  
  const code = error?.response?.data?.code;

  const errorPromptConfig = {
    locale: LOCALE,
    shouldIgnore: () => {
      return errorConfig?.ignore || code === 'FoundRiskAndDoubleConfirm'
    },
    getTitle() {
      if (errorConfig) {
        return intl(errorConfig.title)
      }
      return intl(code, 'Error Notice')
    },
    getMessage() {
      return <div>{errorConfig?.message} { showCopy ? <CopyIcon data={JSON.stringify(error.response?.data)}/> : ''}</div>;
    },
    getRequestId() {
      return error?.response?.data.requestId
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
        if(errorConfig.target === '_blank') {
          window.open(redirectUrl, '_blank')
        } else {
          window.location.href = redirectUrl
        }
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
        if(errorConfig.target === '_blank') {
          window.open(redirectUrl, '_blank')
        } else {
          window.location.href = redirectUrl
        }
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