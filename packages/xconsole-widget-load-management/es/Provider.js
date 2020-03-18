import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import loader from './loader';

var Provider = function Provider(_ref) {
  var children = _ref.children;

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      widgetPool = _useState2[0],
      setWidgetPool = _useState2[1];

  var loadWidget = function loadWidget(_ref2) {
    var id = _ref2.id,
        version = _ref2.version,
        loadOptions = _ref2.loadOptions;
    var TargetWidget = widgetPool[id];

    if (!TargetWidget) {
      var widget = loader({
        id: id,
        version: version
      }, loadOptions);
      setWidgetPool(_objectSpread({}, widgetPool, _defineProperty({}, id, widget)));
      TargetWidget = widget;
    }

    return TargetWidget;
  };

  return React.createElement(Context.Provider, {
    value: loadWidget
  }, children);
};

Provider.displayName = 'WidgetLoadManagement';
Provider.propTypes = {
  children: PropTypes.node
};
export default Provider;