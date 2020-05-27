import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import { wrapDisplayName } from 'recompose';
import Context from './Context';

var withRegion = function withRegion(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_Component) {
    _inherits(H, _Component);

    function H() {
      _classCallCheck(this, H);

      return _possibleConstructorReturn(this, _getPrototypeOf(H).apply(this, arguments));
    }

    _createClass(H, [{
      key: "render",
      value: function render() {
        var _this = this;

        return React.createElement(Context.Consumer, null, function (value) {
          return React.createElement(WrappedComponent, _extends({}, _this.props, {
            region: value
          }));
        });
      }
    }]);

    return H;
  }(Component), _class.displayName = wrapDisplayName(WrappedComponent, 'withRegion'), _temp;
};

export default withRegion;