import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouteLink } from 'dva/router';
import isFunction from 'lodash/isFunction';
import isBoolean from 'lodash/isBoolean';
import classNames from 'classnames';
import { baseClassName, btnClassName, nextClassName } from './constants';
import relative from './relative';

var evalProp = function evalProp(prop, path) {
  if (isBoolean(prop)) {
    return prop;
  }

  if (isFunction(prop)) {
    return prop(path);
  }
};

var getExactClassName = function getExactClassName(shape, type, size, disabled) {
  var result = {
    disabled: disabled
  };

  if (shape === 'button') {
    var _objectSpread2;

    var btnTypeClassName = "".concat(btnClassName, "-").concat(type);
    var btnSizeClassName = "".concat(nextClassName, "-").concat(size);
    return _objectSpread({}, result, (_objectSpread2 = {}, _defineProperty(_objectSpread2, btnClassName, true), _defineProperty(_objectSpread2, btnTypeClassName, true), _defineProperty(_objectSpread2, btnSizeClassName, true), _objectSpread2));
  }

  return result;
};

var Link = /*#__PURE__*/function (_Component) {
  _inherits(Link, _Component);

  function Link() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Link)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      useReactRouterLink: true
    };
    return _this;
  }

  _createClass(Link, [{
    key: "componentDidCatch",
    value: function componentDidCatch(err) {
      var message = err.message;

      if (message && message.indexOf('You should not use <Link> outside a <Router>') > -1) {
        this.setState({
          useReactRouterLink: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$disabled = _this$props.disabled,
          disabled = _this$props$disabled === void 0 ? false : _this$props$disabled,
          _this$props$visible = _this$props.visible,
          visible = _this$props$visible === void 0 ? true : _this$props$visible,
          _this$props$shape = _this$props.shape,
          shape = _this$props$shape === void 0 ? 'text' : _this$props$shape,
          _this$props$type = _this$props.type,
          type = _this$props$type === void 0 ? 'normal' : _this$props$type,
          _this$props$size = _this$props.size,
          size = _this$props$size === void 0 ? 'medium' : _this$props$size,
          restProps = _objectWithoutProperties(_this$props, ["disabled", "visible", "shape", "type", "size"]);

      var to = restProps.to,
          href = restProps.href;
      var exactLinkTargetPath = href || to;
      var exactDisabled = evalProp(disabled, exactLinkTargetPath);
      var exactVisible = evalProp(visible, exactLinkTargetPath);

      if (!exactVisible) {
        return null;
      }

      var exactClassName = classNames(baseClassName, getExactClassName(shape, type, size, exactDisabled));

      if (exactDisabled || !exactLinkTargetPath) {
        return React.createElement("span", _extends({
          className: exactClassName
        }, restProps));
      }

      var useReactRouterLink = this.state.useReactRouterLink;

      if (href || !useReactRouterLink) {
        return React.createElement("a", _extends({
          className: exactClassName
        }, restProps, {
          href: exactLinkTargetPath
        }));
      }

      return React.createElement(RouteLink, _extends({
        className: exactClassName
      }, restProps));
    }
  }]);

  return Link;
}(Component);

Link.propTypes = {
  shape: PropTypes.oneOf(['text', 'button']),
  type: PropTypes.oneOf(['normal', 'primary', 'secondary']),
  size: PropTypes.oneOf(['medium', 'small', 'large']),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  visible: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};
export default relative(Link);