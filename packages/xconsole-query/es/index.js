import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { ModelContext } from '@alicloud/xconsole-model';
import isFunction from 'lodash.isfunction';
import useCompare from './useCompare';

var XConsoleQuery = function XConsoleQuery(_ref) {
  var query = _ref.query,
      variables = _ref.variables,
      children = _ref.children,
      onCompleted = _ref.onCompleted,
      onError = _ref.onError,
      dispatch = _ref.dispatch,
      state = _ref.state;

  // 从 Context 中获取 model 方法
  var _React$useContext = React.useContext(ModelContext),
      attach = _React$useContext.attach,
      detach = _React$useContext.detach; // 注册 model


  var _useState = useState(function () {
    return attach(query);
  }),
      _useState2 = _slicedToArray(_useState, 1),
      model = _useState2[0]; // 保存 variables


  var _useState3 = useState(variables),
      _useState4 = _slicedToArray(_useState3, 2),
      savedVariables = _useState4[0],
      setSavedVariables = _useState4[1];

  var data = model.selectors.result(state) || {};
  var loading = model.action.isLoading(state) || false;
  var error = model.selectors.error(state);

  var loadData = function loadData(vars) {
    // fix 修复当出现大量渲染的时候，对在发生的请求不做重新请求调用
    if (loading !== true) {
      dispatch(model.action(vars, {
        onCompleted: isFunction(onCompleted) ? onCompleted : null,
        onError: isFunction(onError) ? onError : null
      }));
    }
  }; // refetch


  var refetch = function refetch() {
    var nextVariables = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // 合并新旧参数
    var mergedVariables = _objectSpread({}, savedVariables, {}, nextVariables);

    loadData(mergedVariables);
    setSavedVariables(mergedVariables);
  }; // 通过 model 请求数据


  useEffect(function () {
    loadData(variables);
    setSavedVariables(variables);
  }, [useCompare(variables)]); // 组件卸载时注销 model

  useEffect(function () {
    return function () {
      detach(query.namespace);
    };
  }, []);

  if (!isFunction(children)) {
    console.warn('[XConsole Query] children is not a function'); // eslint-disable-line no-console

    return children;
  }

  return children({
    data: data,
    loading: loading,
    error: error,
    variables: savedVariables,
    refetch: refetch
  });
};

XConsoleQuery.propTypes = {
  query: PropTypes.objectOf(PropTypes.any),
  variables: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};
XConsoleQuery.displayName = 'XConsoleQuery';
export default connect(function (state) {
  return {
    state: state
  };
})(XConsoleQuery);