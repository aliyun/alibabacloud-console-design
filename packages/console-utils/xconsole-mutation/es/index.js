import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { ModelContext } from '@alicloud/xconsole-model';
import isFunction from 'lodash.isfunction';
import debug from './_debug';
var isArray = Array.isArray;

var XConsoleMutation = function XConsoleMutation(_ref) {
  var mutation = _ref.mutation,
      variables = _ref.variables,
      children = _ref.children,
      refetchQuery = _ref.refetchQuery,
      onCompleted = _ref.onCompleted,
      onError = _ref.onError,
      dispatch = _ref.dispatch,
      state = _ref.state;

  // 从 Context 中获取 model 方法
  var _React$useContext = React.useContext(ModelContext),
      attach = _React$useContext.attach,
      detach = _React$useContext.detach; // 注册 Mutation model


  var _useState = useState(function () {
    return attach(mutation);
  }),
      _useState2 = _slicedToArray(_useState, 1),
      model = _useState2[0]; // 注册 refetch Query model


  var _useState3 = useState(function () {
    if (!refetchQuery) {
      return [];
    }

    var queries = [refetchQuery];

    if (isFunction(refetchQuery)) {
      debug('refetchQuery 是函数');
      queries = refetchQuery({});

      if (!isArray(queries)) {
        debug('refetchQuery 执行结果不是数组');
        queries = [queries];
      }
    }

    if (isArray(refetchQuery)) {
      debug('refetchQuery 是数组');
      queries = refetchQuery;
    }

    var models = queries.map(function (item) {
      if (!item) {
        return null;
      }

      var query = item.query;

      if (!query) {
        debug('数组中有元素未设置 query 字段');
        console.warn('[XConsole Mutation] query is not set in refetchQuery'); // eslint-disable-line no-console

        return null;
      }

      var _model = attach(query);

      _model.__variables = item.variables || {};
      return _model;
    });
    return models;
  }),
      _useState4 = _slicedToArray(_useState3, 1),
      queryModels = _useState4[0]; // 保存 variables


  var _useState5 = useState(variables),
      _useState6 = _slicedToArray(_useState5, 2),
      savedVariables = _useState6[0],
      setSavedVariables = _useState6[1]; // 组件卸载时注销 model


  useEffect(function () {
    return function () {
      detach(mutation.namespace);

      if (queryModels) {
        debug("Mutation ".concat(mutation.namespace, " \u5378\u8F7D\uFF0C\u9700\u6CE8\u9500 models"));
        queryModels.forEach(function (queryModel) {
          if (queryModel !== null) {
            detach(queryModel.namespace);
          }
        });
      }
    };
  }, []);

  var _onCompleted = function _onCompleted(result) {
    debug("Mutation ".concat(mutation.namespace, " \u8BF7\u6C42\u5B8C\u6210"));

    if (queryModels) {
      debug("Mutation ".concat(mutation.namespace, " \u8BF7\u6C42\u5B8C\u6210, \u6267\u884C refetchQuery \u52A8\u4F5C"));
      queryModels.forEach(function (queryModel) {
        if (queryModel !== null) {
          dispatch(queryModel.action(queryModel.__variables));
        }
      });
    }

    if (isFunction(onCompleted)) {
      onCompleted(result);
    }
  };

  var mutate = function mutate(realVariables) {
    if (realVariables) {
      dispatch(model.action(realVariables, {
        onCompleted: _onCompleted,
        onError: isFunction(onError) ? onError : null
      }));
      setSavedVariables(realVariables);
    } else {
      dispatch(model.action(savedVariables, {
        onCompleted: isFunction(onCompleted) ? onCompleted : null,
        onError: isFunction(onError) ? onError : null
      }));
    }
  };

  var data = model.selectors.result(state);
  var error = model.selectors.error(state);
  var loading = model.action.isLoading(state);

  if (!isFunction(children)) {
    console.warn('[XConsole Mutation] children is not a function'); // eslint-disable-line no-console

    return children;
  }

  return children(mutate, {
    data: data,
    loading: loading,
    error: error
  });
};

XConsoleMutation.propTypes = {
  mutation: PropTypes.objectOf(PropTypes.any),
  variables: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.func,
  refetchQuery: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};
XConsoleMutation.displayName = 'XConsoleMutation';
export default connect(function (state) {
  return {
    state: state
  };
})(XConsoleMutation);