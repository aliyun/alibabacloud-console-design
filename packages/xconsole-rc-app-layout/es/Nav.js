import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RegionContext } from '@alicloud/xconsole-region-context';
import ConsoleMenu from '@alicloud/console-components-console-menu/lib/RoutableMenu';
import { generatePath } from 'dva/router';
import map from 'lodash.map';
import get from 'lodash.get';
import isUndefined from 'lodash.isundefined';

var tryGeneratePath = function tryGeneratePath(key, params) {
  var path;

  try {
    path = generatePath(key, params);
  } catch (error) {
    console.warn("[XConsole AppLayout] ".concat(error));
    return '';
  }

  return path;
};

var Nav = function Nav(_ref) {
  var header = _ref.header,
      items = _ref.items,
      title = _ref.title,
      navs = _ref.navs,
      collapsedKeys = _ref.collapsedKeys,
      restProps = _objectWithoutProperties(_ref, ["header", "items", "title", "navs", "collapsedKeys"]);

  var regionParams = useContext(RegionContext) || {};
  var param = regionParams ? {
    regionId: regionParams.activeRegionId
  } : {};

  var getMenuItems = function getMenuItems() {
    if (isUndefined(navs)) {
      console.warn('[XConsoleAppLayout] sidebar.navs is required');
      return [];
    }

    return map(navs, function (nav) {
      var determinedNav = _objectSpread({}, nav, {
        label: nav.title
      });

      if (nav.key && !nav.href) {
        determinedNav = _objectSpread({}, determinedNav, {
          to: function to(routeProps, item) {
            var params = get(routeProps, 'match.params');
            return tryGeneratePath(item.key, _objectSpread({}, params, {}, param));
          }
        });
      }

      if (nav.subNav) {
        determinedNav = _objectSpread({}, determinedNav, {
          label: nav.title,
          items: map(determinedNav.subNav, function (subNavItem) {
            var _subNavItem = _objectSpread({}, subNavItem, {
              label: subNavItem.title
            });

            if (subNavItem.key && !subNavItem.href) {
              _subNavItem = _objectSpread({}, _subNavItem, {
                to: function to(routeProps, item) {
                  var params = get(routeProps, 'match.params');
                  return tryGeneratePath(item.key, _objectSpread({}, params, {}, param));
                }
              });
            }

            return _subNavItem;
          })
        });
      }

      return determinedNav;
    });
  };

  return React.createElement(ConsoleMenu, _extends({
    header: header || title,
    items: items || getMenuItems()
  }, restProps));
};

Nav.propTypes = {
  header: PropTypes.node,
  title: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.any),
  navs: PropTypes.arrayOf(PropTypes.any)
};
export default Nav;