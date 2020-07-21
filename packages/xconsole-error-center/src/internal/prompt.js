import errorPrompt from '@alicloud/xconsole-rc-error-prompt';
import intl from '@alicloud/console-components-intl';
import _get from 'lodash.get';
import { FoundRiskAndDoubleConfirm, ConsoleNeedLogin, PostonlyOrTokenError } from '../const';

const LOCALE = _get(window, 'ALIYUN_CONSOLE_CONFIG.LOCALE') || 'zh-CN'

const intl2 = (message, fallback = '') => message ? intl(message) : fallback;

export default ({
  error,
  code,
  errorConfig,
  getMessage,
}) => {
  const {
    i18nMessages = {}
  } = (errorConfig || {});

  errorPrompt({
    locale: LOCALE,
    messages: i18nMessages,
    ignoredParamKeys: [],
    ignoreBodyKeys: [],
    shouldIgnore(err) {
      return code === FoundRiskAndDoubleConfirm;
    },
    getTitle(err) {
      if (errorConfig) {
        return intl2(errorConfig.title)
      }
      // return intl2(code, 'Error Notice')
    },
    getMessage(err) {
      const responseMessage = _get(err, 'response.data.message') || err.message || 'No Message Returned.';

      if (errorConfig) {
        if (typeof errorConfig.message === 'function') {
          const result = message(responseMessage);
          return (typeof result === 'string' || typeof result === 'number') ? result : responseMessage
        }
        return intl2(errorConfig.message, responseMessage)
      }
      if ((!errorConfig || !errorConfig.message) && getMessage) {
        return getMessage(code, _get(err, 'response.data.message'))
      }
      return responseMessage
    },
    getConfirm(err) {
      if (errorConfig) {
        return intl2(errorConfig.confirmLabel)
      }
      return ''
    },
    getCancel(err) {
      if (errorConfig) {
        return intl2(errorConfig.cancelLabel)
      }
      return ''
    },
    getRequestId(err) {
      return _get(err, 'response.data.requestId') || _get(err, 'requestId');
    },
    getRequestUrl(err) {
      return _get(err, 'response.config.url') || _get(err, 'data.url');
    },
    getRequestMethod(err) {
      return (_get(err, 'response.config.method') || _get(err, 'data.method') || '').toUpperCase();
    },
    getRequestParams(err) {
      return _get(err, 'response.config.params') || _get(err, 'data.params');
    },
    getRequestBody(err) {
      const ret = {};
      const keys = ['region', 'product', 'action', 'params'];

      keys.forEach(name => {
        const val = _get(err, `response.config.originData.${name}`, null);
        if (val !== null) {
          ret[name] = val;
        }
      })
      return ret
    },
    getRequestExtra(err) {
      return {
        RESPONSE: _get(err, 'response.data', ''),
      };
    },
    onConfirm(err) {
      // 如果错误码指定了重定向地址，则页面重定向到指定地址上
      if (errorConfig && errorConfig.confirmHref) {
        const redirectUrl = errorConfig.confirmHref
        window.location.href = redirectUrl
        return false
      }
      // TODO 支持其他行为

      // 同意对 NeedLogin 默认处理，直接刷新页面，让 OneConsole 层去进行登录 redirect
      if (code === ConsoleNeedLogin || code === PostonlyOrTokenError) {
        window.location.reload();
        return false;
      }
    },
    onCancel(err) {
      // 重定向
      if (errorConfig && errorConfig.cancelHref) {
        const redirectUrl = errorConfig.cancelHref
        window.location.href = redirectUrl
        return false
      }
      // TODO 支持其他行为
    },
  })(error);
};
