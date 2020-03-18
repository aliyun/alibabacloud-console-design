import errorPrompt from '@ali/error-prompt';
import _get from 'lodash.get'

const LOCALE = _get(window, 'ALIYUN_CONSOLE_CONFIG.LOCALE') || 'zh-CN'
const FoundRiskAndDoubleConfirm = 'FoundRiskAndDoubleConfirm'
const ConsoleNeedLogin = 'ConsoleNeedLogin'

export default ({
  errorConfig = {},
}) => errorPrompt({
  locale: LOCALE,
  messages: {},
  ignoredParamKeys: [],
  ignoreBodyKeys: [],
  shouldIgnore(err) {
    const code = _get(err, 'response.data.code') || err.code;
    return code === FoundRiskAndDoubleConfirm;
  },
  getTitle(err) {
    const code = _get(err, 'response.data.code') || err.code;
    if (errorConfig[code]) {
      return errorConfig[code].title
    }
    return 'Error Notice'
  },
  getMessage(err) {
    const code = _get(err, 'response.data.code') || err.code;
    if (errorConfig[code]) {
      return errorConfig[code].message
    }
    return _get(err, 'response.data.message') || err.message || 'No Message Returned.'
  },
  getConfirm(err) {
    const code = _get(err, 'response.data.code') || err.code;
    if (errorConfig[code]) {
      return errorConfig[code].confirmLabel
    }
    return ''
  },
  getCancel(err) {
    const code = _get(err, 'response.data.code') || err.code;
    if (errorConfig[code]) {
      return errorConfig[code].cancelLabel
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
    const code = _get(err, 'response.data.code') || err.code;
    if (errorConfig[code] && errorConfig[code].confirmHref) {
      const redirectUrl = errorConfig[code].confirmHref
      window.location.href = redirectUrl
      return false
    }
    // TODO 支持其他行为

    // 同意对 NeedLogin 默认处理，直接刷新页面，让 OneConsole 层去进行登录 redirect
    if (code === ConsoleNeedLogin) {
      window.location.reload();
      return false;
    }
  },
  onCancel(err) {
    // 重定向
    const code = _get(err, 'response.data.code') || err.code;
    if (errorConfig[code] && errorConfig[code].cancelHref) {
      const redirectUrl = errorConfig[code].cancelHref
      window.location.href = redirectUrl
      return false
    }
    // TODO 支持其他行为
  },
});

