import React from 'react';
import { generatePath } from 'dva/router';
import ConsoleMenu from '@alicloud/console-components-console-menu/RoutableMenu';
import get from 'lodash/get';
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
    onItemClick,
    onOpen,
    ...restProps
  } = props;

  const param = menuParams || {};

  const getMenuItems = (): INavConfig[] => {
    if (isUndefined(navs)) {
      console.warn('[XConsoleAppLayout] sidebar.navs is required');
      return [];
    }

    return navs.filter(Boolean).map((nav) => {
      let determinedNav = {
        ...nav,
        label: nav.title,
      };

      if (nav.key && !nav.href) {
        determinedNav = {
          ...determinedNav,
          // @ts-ignore
          to: (routeProps, item) => {
            // 仅覆盖 to 为 string 的场景
            const params = get(routeProps, 'match.params');
            const nextPath = tryGeneratePath(item.key, {
              ...params,
              ...param,
            });

            if (typeof nav.to === 'function') return nav.to(routeProps, item);

            return nextPath;
          },
        };
      }
      if (nav.subNav) {
        determinedNav = {
          ...determinedNav,
          label: nav.title,
          // @ts-ignore
          items: determinedNav.subNav.map((subNavItem) => {
            let navItem = {
              ...subNavItem,
              label: subNavItem.title,
            };
            if (subNavItem.key && !subNavItem.href) {
              navItem = {
                ...navItem,
                // @ts-ignore
                to: (routeProps, item) => {
                  // 仅覆盖 to 为 string 的场景
                  const params = get(routeProps, 'match.params');
                  const nextPath = tryGeneratePath(item.key, {
                    ...params,
                    ...param,
                  });

                  if (typeof nav.to === 'function') return nav.to(routeProps, item);

                  return nextPath;
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
      onOpen={(key, extra) => {
        onOpen(key, extra);
        onOpenKeys(key);
      }}
      onItemClick={onItemClick}
      {...restProps}
    />
  );
};

export default Nav;
