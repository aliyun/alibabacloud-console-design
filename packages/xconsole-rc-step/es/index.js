import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Step, Grid } from '@alicloud/console-components';
import map from 'lodash.map';
import get from 'lodash.get';
import reduce from 'lodash.reduce';
import findIndex from 'lodash.findindex';
import isFunction from 'lodash.isfunction';
import isUndefined from 'lodash.isundefined';

var XconsoleRcStep = function XconsoleRcStep(_ref) {
  var items = _ref.items,
      children = _ref.children,
      _ref$shape = _ref.shape,
      shape = _ref$shape === void 0 ? 'circle' : _ref$shape,
      _ref$labelPlacement = _ref.labelPlacement,
      labelPlacement = _ref$labelPlacement === void 0 ? 'horizontal' : _ref$labelPlacement,
      restProps = _objectWithoutProperties(_ref, ["items", "children", "shape", "labelPlacement"]);

  if (isUndefined(items)) {
    throw new Error('[XConsole Step] items is required');
  }

  if (isUndefined(children)) {
    throw new Error('[XConsole Step] children is required');
  }

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      current = _useState2[0],
      setCurrent = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      variables = _useState4[0],
      setVariables = _useState4[1];

  var onNext = function onNext(variable) {
    setCurrent(current + 1);
    var key = items[current].key;
    setVariables(_objectSpread({}, variables, _defineProperty({}, key, variable)));
  };

  var onPrev = function onPrev() {
    setCurrent(current - 1);
  };

  var onGo = function onGo(key) {
    var index = findIndex(items, function (item) {
      return item.key === key;
    });
    setCurrent(index);
  };

  var getVariables = function getVariables() {
    return reduce(variables, function (result, cur) {
      return _objectSpread({}, result, {}, cur);
    }, {});
  };

  var getVariable = function getVariable(key) {
    return get(getVariables(), key);
  };

  var step = {
    current: items[current].key,
    getVariable: getVariable,
    getVariables: getVariables,
    variables: variables,
    next: onNext,
    prev: onPrev,
    go: onGo
  };
  return React.createElement(Grid.Row, {
    wrap: true
  }, React.createElement(Grid.Col, {
    span: "24"
  }, React.createElement(Step, _extends({
    current: current,
    shape: shape,
    labelPlacement: labelPlacement
  }, restProps), items && map(items, function (_ref2) {
    var key = _ref2.key,
        title = _ref2.title,
        _onClick = _ref2.onClick;
    return React.createElement(Step.Item, {
      key: key,
      title: title,
      onClick: function onClick() {
        return _onClick(step);
      }
    });
  }))), React.createElement(Grid.Col, {
    span: "24",
    align: "center"
  }, isFunction(children) && children(step)));
};

XconsoleRcStep.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  children: PropTypes.func,
  shape: PropTypes.string,
  labelPlacement: PropTypes.string
};
export default XconsoleRcStep;