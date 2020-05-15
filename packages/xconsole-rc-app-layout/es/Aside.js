import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useRef, useEffect, useContext, Component } from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import { matchPath, withRouter } from 'dva/router';
import AppLayout from '@alicloud/console-components-app-layout';
import each from 'lodash.foreach';
import isArray from 'lodash/isArray';
import Nav from './Nav';
import Context from './Context';

var XConsoleAppLayoutAside = function XConsoleAppLayoutAside(_ref) {
  var _ref$appConfig = _ref.appConfig,
      appConfig = _ref$appConfig === void 0 ? {} : _ref$appConfig,
      pathname = _ref.location.pathname,
      children = _ref.children;

  var _useContext = useContext(Context),
      sidebar = _useContext.sidebar;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1];

  var _appConfig$consoleMen = appConfig.consoleMenu,
      consoleMenu = _appConfig$consoleMen === void 0 ? {} : _appConfig$consoleMen;
  var displayPath = consoleMenu.displayPath,
      notDisplayPath = consoleMenu.notDisplayPath,
      _consoleMenu$collapse = consoleMenu.collapsedPath,
      collapsedPath = _consoleMenu$collapse === void 0 ? [] : _consoleMenu$collapse,
      _consoleMenu$defaultO = consoleMenu.defaultOpen,
      defaultOpen = _consoleMenu$defaultO === void 0 ? [] : _consoleMenu$defaultO;

  var getPathIsMatch = function getPathIsMatch(path) {
    var paths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var pathIsMatch = false;
    paths.some(function (_path) {
      var isMatch = null;

      if (_path === '*') {
        pathIsMatch = true;
        return true;
      }

      if (_path instanceof RegExp) {
        isMatch = _path.test(path);
      } else {
        isMatch = matchPath(path, {
          path: _path,
          exact: true,
          strict: true
        });
      }

      if (isMatch) {
        pathIsMatch = true;
        return true;
      } else {
        return false;
      }
    });
    return pathIsMatch;
  };

  var showSidebar = true; // 当 displayPath 被设置时， 所有路径下都不展示侧边栏

  if (typeof displayPath !== 'undefined') {
    showSidebar = false;
    showSidebar = getPathIsMatch(pathname, displayPath);
  } else {
    showSidebar = !getPathIsMatch(pathname, notDisplayPath || sidebar.invisiblePaths || []);
  }

  sidebar.defaultOpenKeys = sidebar.defaultOpenKeys || [];
  defaultOpen.forEach(function (item) {
    sidebar.defaultOpenKeys.push(item);
  }); // save prev collapsed

  var prevState = useRef();
  useEffect(function () {
    prevState.current = collapsed;
  });
  useEffect(function () {
    var collapse = false;
    var collapsedTarget = collapsedPath.length > 0 ? collapsedPath : sidebar.collapsedKeys || [];
    each(collapsedTarget, function (key) {
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
  var nav = showSidebar ? React.createElement(Nav, sidebar) : null;
  return React.createElement(AppLayout, {
    adjustHeight: 50,
    nav: nav,
    navCollapsed: collapsed,
    onNavCollapseTriggerClick: toggleNavCollapsed
  }, children);
};

XConsoleAppLayoutAside.displayName = 'XConsoleAppLayoutAside';
XConsoleAppLayoutAside.propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any)
};
export default XConsoleAppLayoutAside;