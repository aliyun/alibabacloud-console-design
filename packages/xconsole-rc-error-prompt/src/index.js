import _isString from 'lodash/isString';
import _isPlainObject from 'lodash/isPlainObject';
import _isEmpty from 'lodash/isEmpty';
import _reduce from 'lodash/reduce';
import _noop from 'lodash/noop';
import React from 'react';
import qs from 'qs';

import {
  open
} from '@alicloud/xconsole-rc-dialog';

import DialogContent from './dialog-content';

import {
  FIELD_NAME,
  getFieldDefaults
} from './_common';

import intlSimple from './intl-simple';

const SOLO = {
  dialogResult: null,
  queue: [] // 错误队列 { error, resolve }
};

function defaultGetCode(error) {
  const errorIsString = _isString(error);

  return errorIsString ? '' : error.code;
}

function defaultGetMessage(error) {
  const errorIsString = _isString(error);

  return errorIsString ? error : error.message;
}

/**
 * 获取纯的 url 和 merge 并去干扰的 url 参数
 *
 * @param {string} url
 * @param {object|string} params
 * @param {array} ignoredParamKeys
 * @return {array} [url: string, params: object]
 */
function getUrlAndParams(url, params, ignoredParamKeys) {
  let pureUrl = url;
  let pureParams = {};

  if (_isString(url)) {
    [pureUrl, pureParams] = url.split('?');

    pureParams = pureParams ? qs.parse(pureParams) : {};
  }

  if (params) {
    pureParams = {
      ...pureParams,
      ...(_isString(params) ? qs.parse(params) : params)
    };
  }

  ignoredParamKeys.forEach(v => {
    delete pureParams[v];
  });

  return [pureUrl, pureParams];
}

/**
 * 获取去干扰的 body 参数
 *
 * @param {object|string} body
 * @param {object} ignoredBodyKeys
 * @return {object}
 */
function getBody(body, ignoredBodyKeys) {
  if (!body) {
    return null;
  }

  const bodyParams = _isString(body) ? qs.parse(body) : {
    ...body
  };

  ignoredBodyKeys.forEach(v => {
    delete bodyParams[v];
  });

  return bodyParams;
}

/**
 * 错误提示产生器，因为它并不知道错误的 code、message，请求相关的 method、url、params、body、requestId 等的任何信息，需要你告诉它。
 *
 * @param {string} locale
 * @param {object} messages
 * @param {array<string>} [ignoredParamKeys]
 * @param {array<string>} [ignoredBodyKeys]
 * @param {boolean} [requestIdPriorToCode]
 * @param {function} [shouldIgnore]
 * @param {function} [getTitle]
 * @param {function} [getConfirm]
 * @param {function} [getCancel]
 * @param {function} [getCode]
 * @param {function} [getMessage]
 * @param {function} [getRequestId]
 * @param {function} [getRequestMethod]
 * @param {function} [getRequestUrl]
 * @param {function} [getRequestParams]
 * @param {function} [getRequestBody]
 * @param {function} [getRequestExtra]
 * @param {function} [onConfirm]
 * @param {function} [onCancel]
 * @return {function}
 */
export default function({
  locale,
  messages,
  ignoredParamKeys = [],
  ignoredBodyKeys = ['token', 'secToken', 'collina'],
  requestIdPriorToCode,
  shouldIgnore = _noop,
  getCode = _noop,
  getMessage = _noop,
  getTitle = _noop,
  getConfirm = _noop,
  getCancel = _noop,
  getRequestId = _noop,
  getRequestUrl = _noop,
  getRequestMethod = _noop,
  getRequestParams = _noop,
  getRequestBody = _noop,
  getRequestExtra = _noop,
  onConfirm,
  onCancel
} = {}) {
  const intl = intlSimple(locale, messages);
  const defaultTitle = intl('alert_error.title');
  const defaultConfirm = intl('alert_error.confirm');
  const defaultCancel = intl('alert_error.cancel');

  /**
   * 错误提示，经过这里的处理，错误将可以被忽略
   *
   * @param {Error|object|string} error
   * @return {Promise} 永不 reject
   */
  return function(error) {
    if (!error || shouldIgnore(error)) { // 忽略空错误以及指定的某些错误
      return Promise.resolve();
    }

    function getDetails() {
      const [url, params] = getUrlAndParams(getRequestUrl(error), getRequestParams(error), ignoredParamKeys);
      const extra = getRequestExtra(error);
      const details = _reduce({
        code: getCode(error) || defaultGetCode(error),
        request_id: getRequestId(error),
        method: getRequestMethod(error),
        url,
        params,
        body: getBody(getRequestBody(error), ignoredBodyKeys),
        ...(_isPlainObject(extra) ? extra : null)
      }, (result, v, k) => {
        if (!_isEmpty(v)) {
          result[k] = v;
        }

        return result;
      }, {});

      return _isEmpty(details) ? null : details;
    }

    const {
      queue
    } = SOLO;
    const details = getDetails();
    const errorQueueObject = {
      error,
      title: getTitle(error, details) || defaultTitle,
      confirm: getConfirm(error, details) || defaultConfirm,
      cancel: getCancel(error, details) || defaultCancel,
      message: getMessage(error, details) || defaultGetMessage(error),
      details
    };
    const errorPromise = new Promise(resolve => {
      errorQueueObject.resolve = resolve;
    });

    queue.push(errorQueueObject);

    const dialogProps = {
      content: <DialogContent {...{
        queue,
        intl,
        requestIdPriorToCode
      }} />
    };

    if (SOLO.dialogResult) {
      SOLO.dialogResult.render(dialogProps);

      return errorPromise;
    }

    const dialogResult = open(true, {
      ...dialogProps,
      undefinedAsReject: false,
      fieldOptions: {
        values: getFieldDefaults()
      }
    }, field => {
      const queueObject = queue[field.getValue(FIELD_NAME.INDEX)];

      return {
        title: queueObject.title,
        buttons: [{
          label: queueObject.confirm,
          result: true
        }, queueObject.cancel]
      };
    });

    SOLO.dialogResult = dialogResult;

    dialogResult.promise.then(result => {
      queue.forEach(v => v.resolve());

      SOLO.dialogResult = null;
      SOLO.queue = [];

      const callback = result ? onConfirm : onCancel;

      if (callback) {
        queue.some(v => (callback(v.error) === false)); // 回调返回 false 可以提前中断回调序列
      }
    });

    return errorPromise;
  };
}