import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RegionContext } from '@alicloud/xconsole-region-context';
import ConsoleMenu from '@alicloud/console-components-console-menu/lib/RoutableMenu';
import { transTitleToHeader, transNavToItems, withDefaultToPath } from './utils';

var Menu = function Menu(_ref) {
  var header = _ref.header,
      title = _ref.title,
      items = _ref.items,
      navs = _ref.navs,
      restProps = _objectWithoutProperties(_ref, ["header", "title", "items", "navs"]);

  // get current regionId from context
  var regionParams = useContext(RegionContext) || {};
  var extraParams = {
    regionId: regionParams.activeRegionId || 'cn-hangzhou'
  }; // trans header & items

  var determinedHeader = header || transTitleToHeader(title);
  var determinedItems = items || transNavToItems(navs);
  return React.createElement(ConsoleMenu, _extends({
    header: determinedHeader,
    items: withDefaultToPath(determinedItems, extraParams)
  }, restProps));
};

Menu.propTypes = {
  header: PropTypes.node,
  title: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.any),
  navs: PropTypes.arrayOf(PropTypes.any)
};
export default Menu;