import React, { useContext } from 'react';
import { RegionContext } from '@alicloud/xconsole-region-context';
import ConsoleMenu from '@alicloud/console-components-console-menu/lib/RoutableMenu';
import {
  transTitleToHeader,
  transNavToItems,
  withDefaultToPath,
} from './utils/index';

const Menu = ({ header, title, items, navs, ...restProps }) => {
  // get current regionId from context
  const regionParams = useContext(RegionContext) || {};
  const extraParams = {
    regionId: regionParams.activeRegionId || 'cn-hangzhou',
  };
  // trans header & items
  const determinedHeader = header || transTitleToHeader(title);
  const determinedItems = items || transNavToItems(navs);
  return (
    <ConsoleMenu
      header={determinedHeader}
      items={withDefaultToPath(determinedItems, extraParams)}
      {...restProps}
    />
  );
};

export default Menu;
