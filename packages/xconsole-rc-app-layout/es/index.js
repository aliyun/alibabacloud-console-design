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
import isArray from 'lodash/isArray';
import Nav from './Nav';
import Context from './Context';
import Aside from './Aside';
var noticeFlag = false;

var XConsoleAppLayout = function XConsoleAppLayout(_ref) {
  var _ref$sidebar = _ref.sidebar,
      sidebar = _ref$sidebar === void 0 ? {} : _ref$sidebar,
      _ref$appConfig = _ref.appConfig,
      appConfig = _ref$appConfig === void 0 ? {} : _ref$appConfig,
      pathname = _ref.location.pathname,
      children = _ref.children;

  var _useState = useState(sidebar.title || 'XConsole'),
      _useState2 = _slicedToArray(_useState, 2),
      title = _useState2[0],
      setTitle = _useState2[1];

  var _useState3 = useState(sidebar.navs || []),
      _useState4 = _slicedToArray(_useState3, 2),
      navs = _useState4[0],
      setNavs = _useState4[1];

  if (noticeFlag === false && (typeof sidebar.defaultOpenKeys !== 'undefined' || typeof sidebar.collapsedKeys !== 'undefined' || typeof sidebar.invisiblePaths !== 'undefined')) {
    noticeFlag = true;
    console.warn('[xconsole rc-app-layout] sidebar.js 中关于 defaultOpenKeys collapsedKeys invisiblePaths 的配置不再推荐使用，请在 appConfig.js 中配置 consoleMenu， 具体配置信息及字段说明请前往官网查看 【开发指南】 文档。');
  }

  return React.createElement(Context.Provider, {
    value: {
      sidebar: {
        title: title,
        navs: navs,
        collapsedKeys: []
      },
      setTitle: setTitle,
      setNavs: setNavs
    }
  }, React.createElement(Aside, {
    appConfig: appConfig,
    location: location
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