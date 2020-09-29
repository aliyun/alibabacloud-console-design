import React from 'react';
import { generatePath } from 'dva/router';
import ConsoleMenu from '@alife/alicloud-components-console-menu/RoutableMenu';
import map from 'lodash.map';
import get from 'lodash.get';
import isUndefined from 'lodash.isundefined';
import { IMenuProps, INavConfig } from './types/index';
import useOpenKeys from './hooks/useOpenKeys';

const tryGeneratePath = (key: string, params: any): string => {
  try {
    return generatePath(key, params);
  } catch (error) {
    return '';
  }
};

const Nav: React.FC<IMenuProps> = (props: IMenuProps) => {
  const {
    header,
    items,
    title,
    navs,
    defaultOpenKeys,
    currentPath,
    menuParams,
    ...restProps
  } = props;

  const param = menuParams || {};

  const getMenuItems = (): INavConfig[] => {
    if (isUndefined(navs)) {
      console.warn('[XConsoleAppLayout] sidebar.navs is required');
      return [];
    }

    return map(navs, (nav) => {
      let determinedNav = {
        ...nav,
        label: nav.title,
      };

      if (nav.key && !nav.href) {
        determinedNav = {
          ...determinedNav,
          // @ts-ignore
          to: (routeProps, item) => {
            const params = get(routeProps, 'match.params');
            return tryGeneratePath(item.key, {
              ...params,
              ...param,
            });
          },
        };
      }
      if (nav.subNav) {
        determinedNav = {
          ...determinedNav,
          label: nav.title,
          // @ts-ignore
          items: map(determinedNav.subNav, (subNavItem) => {
            let navItem = {
              ...subNavItem,
              label: subNavItem.title,
            };
            if (subNavItem.key && !subNavItem.href) {
              navItem = {
                ...navItem,
                // @ts-ignore
                to: (routeProps, item) => {
                  const params = get(routeProps, 'match.params');
                  return tryGeneratePath(item.key, {
                    ...params,
                    ...param,
                  });
                },
              };
            }
            return navItem;
          }),
        };
      }
      return determinedNav;
    });
  };

  const { openKeys, onOpenKeys } = useOpenKeys(
    defaultOpenKeys,
    navs,
    currentPath
  );

  return (
    <ConsoleMenu
      header={header || title}
      items={items || getMenuItems()}
      openKeys={openKeys}
      onOpen={onOpenKeys}
      {...restProps}
    />
  );
};

export default Nav;
