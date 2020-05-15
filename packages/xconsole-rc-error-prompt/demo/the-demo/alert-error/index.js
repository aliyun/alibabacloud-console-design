import _get from 'lodash/get';

import errorPrompt from '../../../src';

const ERROR_CODE = {
  SIGN_IN: 'PLEASE_SIGN_IN',
  CAN_BE_IGNORED: 'THIS_ERROR_IS_TAKEN_CARE_OF_AND_CAN_BE_IGNORED',
  SOMETHING_WRONG: 'SOMETHING_WRONG',
  FETCH_BIZ: 'FETCH_BIZ',
  CHANGE_MESSAGE: 'CHANGE_MESSAGE'
};
const ERROR_NAME = {
  SIGN_IN: 'ErrorSignInRequired',
  CAN_BE_IGNORED: 'ErrorTakenCareOfAndCanBeIgnored',
  SOMETHING_WRONG: 'ErrorSomethingWrong',
  FETCH_BIZ: 'ErrorFetchBiz',
  CHANGE_MESSAGE: 'ErrorChangeMyMessage'
};

export default errorPrompt({
  locale: 'zh-CN',
  ignoredParamKeys: ['_cache_busting'],
  requestIdPriorToCode: false,
  shouldIgnore: err => err.code === ERROR_CODE.CAN_BE_IGNORED,
  getTitle(err) {
    if (err.name === ERROR_NAME.SIGN_IN || err.code === ERROR_CODE.SIGN_IN) {
      return '登录啊？！';
    }
  },
  getMessage(err) {
    if (err.code === ERROR_CODE.CHANGE_MESSAGE) {
      return `code = ${ERROR_CODE.CHANGE_MESSAGE} 的 message 被 getMessage 改成了这个。`;
    }
  },
  getConfirm(err) {
    if (err.name === ERROR_NAME.SIGN_IN || err.code === ERROR_CODE.SIGN_IN) {
      return '刷新页面并登录';
    }
  },
  getRequestId(err) {
    return _get(err, '_fetch.requestId');
  },
  getRequestUrl(err) {
    return _get(err, '_fetch.url');
  },
  getRequestMethod(err) {
    return _get(err, '_fetch.method');
  },
  getRequestParams(err) {
    return _get(err, '_fetch.params');
  },
  getRequestBody(err) {
    return _get(err, '_fetch.body');
  },
  getRequestExtra(err) {
    return {
      EXTRA1: _get(err, '_fetch.extra1'),
      EXTRA2: _get(err, '_fetch.extra2')
    };
  },
  onConfirm(err) {
    if (err.name === ERROR_NAME.SIGN_IN || err.code === ERROR_CODE.SIGN_IN) {
      window.location.reload();
      
      return false;
    }
  }
});

export {
  ERROR_CODE,
  ERROR_NAME
};