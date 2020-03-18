import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import resolvePathname from 'resolve-pathname';
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import withProps from 'recompose/withProps';
import mapProps from 'recompose/mapProps';
import { withRouter } from 'dva/router';
var transRelativeUrl = withProps(function (props) {
  var to = props.to,
      location = props.location;
  var pathname = location.pathname;
  var exactPathname = pathname[pathname.length - 1] === '/' ? pathname : "".concat(pathname, "/");
  var combinedProps = {};

  if (to) {
    combinedProps = _objectSpread({}, combinedProps, {
      to: resolvePathname(to, exactPathname)
    });
  }

  return combinedProps;
});
var cleanProps = mapProps(function (props) {
  var history = props.history,
      match = props.match,
      location = props.location,
      staticContext = props.staticContext,
      relative = props.relative,
      restProps = _objectWithoutProperties(props, ["history", "match", "location", "staticContext", "relative"]);

  return restProps;
});
var withRelativeUrl = compose(withRouter, transRelativeUrl, cleanProps);

var isRelative = function isRelative(props) {
  return props.relative === true;
};

var relative = branch(isRelative, withRelativeUrl);
export default relative;