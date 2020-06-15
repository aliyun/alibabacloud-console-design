import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@alicloud/console-components';

var Trigger = /*#__PURE__*/function (_Component) {
  _inherits(Trigger, _Component);

  var _super = _createSuper(Trigger);

  function Trigger() {
    _classCallCheck(this, Trigger);

    return _super.apply(this, arguments);
  }

  _createClass(Trigger, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          label = _this$props.label,
          active = _this$props.active,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseLeave = _this$props.onMouseLeave;
      return /*#__PURE__*/React.createElement("div", {
        className: classNames('wind-rc-region', 'dropdown', 'dropdown-trigger', {
          active: active === true
        }, className),
        style: style,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave
      }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement(Icon, {
        type: "arrow-down",
        size: "xs"
      }));
    }
  }]);

  return Trigger;
}(Component);

Trigger.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.node,
  active: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};
export default Trigger;