import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@alicloud/console-components';

var Trigger = /*#__PURE__*/function (_Component) {
  _inherits(Trigger, _Component);

  function Trigger() {
    _classCallCheck(this, Trigger);

    return _possibleConstructorReturn(this, _getPrototypeOf(Trigger).apply(this, arguments));
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
      return React.createElement("div", {
        className: classNames('wind-rc-region', 'dropdown', 'dropdown-trigger', {
          active: active === true
        }, className),
        style: style,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave
      }, React.createElement("span", null, label), React.createElement(Icon, {
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