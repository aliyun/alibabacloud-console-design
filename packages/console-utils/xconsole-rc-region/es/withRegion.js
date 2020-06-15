import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { wrapDisplayName } from 'recompose';
import Context from './Context';

var withRegion = function withRegion(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_Component) {
    _inherits(H, _Component);

    var _super = _createSuper(H);

    function H() {
      _classCallCheck(this, H);

      return _super.apply(this, arguments);
    }

    _createClass(H, [{
      key: "render",
      value: function render() {
        var _this = this;

        return /*#__PURE__*/React.createElement(Context.Consumer, null, function (value) {
          return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, _this.props, {
            region: value
          }));
        });
      }
    }]);

    return H;
  }(Component), _class.displayName = wrapDisplayName(WrappedComponent, 'withRegion'), _temp;
};

export default withRegion;