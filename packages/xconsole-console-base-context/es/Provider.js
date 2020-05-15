import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import get from 'lodash.get';
import reduce from 'lodash.reduce';
var mapping = {
  links: 'CHANNEL_LINKS',
  // 渠道链接
  features: 'CHANNEL_FEATURE_STATUS',
  // 渠道开关
  gray: 'FEATURE_STATUS',
  // 功能灰度
  mainAccountPK: 'MAIN_ACCOUNT_PK',
  // 当前登录用户的主账号PK
  currentPK: 'CURRENT_PK',
  // 当前登录用户的PK
  accountType: 'ACCOUNT_TYPE',
  // 当前登录用户的类型，包括main，sub, sts
  accountName: 'ACCOUNT_NAME',
  // 子账号名称
  openStatus: 'OPEN_STATUS',
  // 服务开通状态
  locale: 'LOCALE',
  // 多语言
  regions: 'REGIONS' // 多语言

};

var Provider = function Provider(_ref) {
  var children = _ref.children,
      key = _ref.key;
  var configs = get(window, key || 'ALIYUN_CONSOLE_CONFIG');
  var value = reduce(mapping, function (result, v, k) {
    return _objectSpread({}, result, _defineProperty({}, k, get(configs, v)));
  }, {});
  return React.createElement(Context.Provider, {
    value: value
  }, children);
};

Provider.displayName = 'ConsoleBaseProvider';
Provider.propTypes = {
  key: PropTypes.string,
  children: PropTypes.node
};
export default Provider;