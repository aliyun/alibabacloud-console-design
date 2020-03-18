import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useRef, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import { matchPath, withRouter } from 'dva/router';
import AppLayout from '@alicloud/console-components-app-layout';
import each from 'lodash.foreach';
import Nav from './Nav';
import Context from './Context';

var XConsoleAppLayout = function XConsoleAppLayout(_ref) {
  var _ref$sidebar = _ref.sidebar,
      sidebar = _ref$sidebar === void 0 ? {} : _ref$sidebar,
      pathname = _ref.location.pathname,
      children = _ref.children;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1]; // save prev collapsed


  var prevState = useRef();
  useEffect(function () {
    prevState.current = collapsed;
  });
  useEffect(function () {
    var collapse = false;
    each(sidebar.collapsedKeys, function (key) {
      if (matchPath(pathname, {
        path: key,
        exact: true,
        strict: true
      })) {
        collapse = true;
        return true;
      }
    });
    setCollapsed(collapse);
  }, [pathname]);

  var toggleNavCollapsed = function toggleNavCollapsed(prevCollapsed) {
    setCollapsed(typeof prevCollapsed === 'boolean' ? !prevCollapsed : !prevState.current);
  };

  var providerValue = {
    navCollapsed: collapsed
  };
  return React.createElement(AppLayout, {
    adjustHeight: 50,
    nav: React.createElement(Nav, sidebar),
    navCollapsed: collapsed,
    onNavCollapseTriggerClick: toggleNavCollapsed
  }, React.createElement(Context.Provider, {
    value: providerValue
  }, children));
};

XConsoleAppLayout.displayName = 'XConsoleAppLayout';
XConsoleAppLayout.propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any)
};
export default withRouter(XConsoleAppLayout);
export var AppLayoutContext = Context;
export var withNavCollapsed = function withNavCollapsed(WrappedComponent) {
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

        return React.createElement(Context.Consumer, null, function (_ref2) {
          var navCollapsed = _ref2.navCollapsed;
          return React.createElement(WrappedComponent, _extends({}, _this.props, {
            navCollapsed: navCollapsed
          }));
        });
      }
    }]);

    return H;
  }(Component), _class.displayName = wrapDisplayName(WrappedComponent, 'withAppLayoutCollapsed'), _temp;
};