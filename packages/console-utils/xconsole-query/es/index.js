import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';

/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { ModelContext } from '@alicloud/xconsole-model';
import isFunction from 'lodash.isfunction';
import useCompare from './useCompare';

function ownKeys(object, enumerableOnly) { const keys = Object.keys(object); if (Object.getOwnPropertySymbols) { let symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter((sym) => { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach((key) => { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach((key) => { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const XConsoleQuery = function XConsoleQuery(_ref) {
  const { query } = _ref;
  const { variables } = _ref;
  const { children } = _ref;
  const { onCompleted } = _ref;
  const { onError } = _ref;
  const { dispatch } = _ref;
  const { state } = _ref;

  // 从 Context 中获取 model 方法
  const _React$useContext = React.useContext(ModelContext);
  const { attach } = _React$useContext;
  const { detach } = _React$useContext; // 注册 model

  console.log('xconsole query', query)
  const _useState = useState(() => {
    return attach(query);
  });
  const _useState2 = _slicedToArray(_useState, 1);
  const model = _useState2[0]; // 保存 variables


  const _useState3 = useState(variables);
  const _useState4 = _slicedToArray(_useState3, 2);
  const savedVariables = _useState4[0];
  const setSavedVariables = _useState4[1];

  const data = model.selectors.result(state) || {};
  const loading = model.action.isLoading(state) || false;
  const error = model.selectors.error(state);

  const loadData = function loadData(vars) {
    console.log('debugme query loadData', vars, loading, error, data); // fix 修复当出现大量渲染的时候，对在发生的请求不做重新请求调用

    if (loading !== true) {
      dispatch(model.action(vars, {
        onCompleted: isFunction(onCompleted) ? onCompleted : null,
        onError: isFunction(onError) ? onError : null,
      }));
    }
  }; // refetch


  const refetch = function refetch() {
    const nextVariables = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // 合并新旧参数
    const mergedVariables = _objectSpread({}, savedVariables, {}, nextVariables);

    loadData(mergedVariables);
    setSavedVariables(mergedVariables);
  }; // 通过 model 请求数据


  useEffect(() => {
    loadData(variables);
    setSavedVariables(variables);
  }, [useCompare(variables)]); // 组件卸载时注销 model

  useEffect(() => {
    return function () {
      detach(query.namespace);
    };
  }, []);

  if (!isFunction(children)) {
    console.warn('[XConsole Query] children is not a function'); // eslint-disable-line no-console

    return children;
  }

  return children({
    data,
    loading,
    error,
    variables: savedVariables,
    refetch,
  });
};

XConsoleQuery.propTypes = {
  query: PropTypes.objectOf(PropTypes.any),
  variables: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
};
XConsoleQuery.displayName = 'XConsoleQuery';
export default connect((state) => {
  return {
    state,
  };
})(XConsoleQuery);
