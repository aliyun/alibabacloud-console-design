import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { generatePath } from 'dva/router';
import isUndefined from 'lodash.isundefined';
import get from 'lodash.get';
import map from 'lodash.map';
export var transTitleToHeader = function transTitleToHeader(title) {
  return title;
};
export var transNavToItems = function transNavToItems(navs) {
  return map(navs, function (nav) {
    return _objectSpread({}, nav, {
      label: nav.title,
      visible: isUndefined(nav.hide) ? true : !nav.hide,
      items: isUndefined(nav.subNav) ? null : map(nav.subNav, function (sub) {
        return _objectSpread({}, sub, {
          label: sub.title,
          visible: isUndefined(sub.hide) ? true : !sub.hide
        });
      })
    });
  });
};

var getToPath = function getToPath(extraParams) {
  return function (routeProps, item) {
    var path = '';
    var routeParams = get(routeProps, 'match.params') || {};

    try {
      path = generatePath(item.key, _objectSpread({}, routeParams, {}, extraParams));
    } catch (error) {
      console.warn("[XConsole AppLayout] ".concat(error));
    }

    return path;
  };
};

export var withDefaultToPath = function withDefaultToPath(items, extraParams) {
  return map(items, function (item) {
    var _item = _objectSpread({}, item);

    if (item.key && !item.href) {
      _item.to = getToPath(extraParams);
    }

    if (item.items) {
      _item.items = map(item.items, function (i) {
        var subItem = _objectSpread({}, i);

        if (!i.href) {
          subItem.to = getToPath(extraParams);
        }

        return subItem;
      });
    }

    return _item;
  });
};