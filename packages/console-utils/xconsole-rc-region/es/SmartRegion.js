import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { compose, mapProps, withProps } from 'recompose';
import { union, intersection } from './data/transform';
import Region from './Region';
import withRegion from './withRegion';
/**
 * Hijack `onItemClick` prop as higher-order component
 * @param {Component}
 * @returns {Component}
 */

var hijackOnItemClick = mapProps(function (ownerProps) {
  var region = ownerProps.region,
      restProps = _objectWithoutProperties(ownerProps, ["region"]);

  var _onItemClick = region.onItemClick,
      restRegionProps = _objectWithoutProperties(region, ["onItemClick"]);

  return _objectSpread({}, restProps, {}, restRegionProps, {
    onItemClick: function onItemClick() {
      var propOnItemClick = ownerProps.onItemClick;

      if (propOnItemClick) {
        var preventDefault = propOnItemClick.apply(void 0, arguments) === false;

        if (preventDefault) {
          return;
        }
      }

      _onItemClick && _onItemClick.apply(void 0, arguments);
    }
  });
});
/**
 * Determine suited shape as higher-order component
 * @param {Component}
 * @returns {Component}
 */

var smartShape = withProps(function (ownerProps) {
  var portal = ownerProps.portal;

  if (portal === true) {
    return {
      shape: 'dropdown'
    };
  }

  return null;
});
/**
 * Transform data-source by remote data and shape as higher-order component
 * @param {Component}
 * @returns {Component}
 */

var transformDataSource = withProps(function (ownerProps) {
  var dataSource = ownerProps.dataSource,
      remoteDataSource = ownerProps.remoteDataSource,
      shape = ownerProps.shape,
      transformer = ownerProps.transformer;

  if (remoteDataSource) {
    // User can define a transformer as function to transform data-source
    // In the other hand, default transformer will take effect by `shape` prop
    var exactTransformer = transformer || (shape === 'dropdown' ? union : intersection);
    return exactTransformer ? {
      dataSource: exactTransformer(remoteDataSource, dataSource)
    } : null;
  }

  return null;
});
var enhance = compose(smartShape, withRegion, hijackOnItemClick, transformDataSource);
var SmartRegion = enhance(Region);
export default SmartRegion;