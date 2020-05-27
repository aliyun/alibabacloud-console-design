import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, routerRedux, withRouter } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import determineActiveId from './determineActiveId';
import connect from './connect';
import Provider from './Provider';

var RegionContextRoute = /*#__PURE__*/function (_Component) {
  _inherits(RegionContextRoute, _Component);

  function RegionContextRoute() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RegionContextRoute);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RegionContextRoute)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.renderContext = _this.renderContext.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RegionContextRoute, [{
    key: "replaceLocation",
    value: function replaceLocation(nextActiveId, routeProps) {
      var replaceLocation = this.props.replaceLocation;
      var toPath = pathToRegexp.compile(routeProps.match.path);
      var nextPath = toPath({
        regionId: nextActiveId
      });

      if (replaceLocation) {
        return replaceLocation(_objectSpread({}, routeProps, {
          nextActiveId: nextActiveId,
          nextPath: nextPath
        }));
      }

      var match = routeProps.match,
          location = routeProps.location;
      var nextPathname = location.pathname.replace(match.url, nextPath);
      return _objectSpread({}, location, {
        pathname: nextPathname
      });
    }
  }, {
    key: "renderContext",
    value: function renderContext(routeProps) {
      var _this2 = this;

      var match = routeProps.match;

      if (!match) {
        return null;
      }

      var _this$props = this.props,
          propPath = _this$props.path,
          pushLocation = _this$props.pushLocation,
          restProps = _objectWithoutProperties(_this$props, ["path", "pushLocation"]);

      var activeId = restProps.activeId,
          dataSource = restProps.dataSource,
          dispatch = restProps.dispatch;
      var params = match.params;
      var regionId = params.regionId;
      var expectedNextActiveId = determineActiveId(regionId, activeId, dataSource);

      if (regionId !== expectedNextActiveId) {
        return React.createElement(Redirect, {
          to: this.replaceLocation(expectedNextActiveId, routeProps)
        });
      }

      return React.createElement(Provider, _extends({
        nextActiveId: regionId,
        onItemClick: function onItemClick(id) {
          // May cause memory leaks?
          dispatch(routerRedux.push(_this2.replaceLocation(id, routeProps))); // Prevent default behavior will not trigger
          // the `change` event of `RegionContext`,
          // cause `RegionContextRoute` only trigger the event
          // when spec route param (which is passing to `nextActiveId`)
          // was changed

          return false;
        }
      }, restProps));
    }
  }, {
    key: "render",
    value: function render() {
      var path = this.props.path;
      return React.createElement(Route, {
        path: path,
        render: this.renderContext
      });
    }
  }]);

  return RegionContextRoute;
}(Component);

RegionContextRoute.propTypes = _objectSpread({
  path: PropTypes.string,
  pushLocation: PropTypes.func
}, Provider.propTypes);
export default withRouter(connect(RegionContextRoute));