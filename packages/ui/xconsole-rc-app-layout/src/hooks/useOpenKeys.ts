import { useState, useEffect } from 'react';
import { matchPath } from 'dva/router';
import { INavConfig } from '../types/index';

interface IOpenKeysType {
  openKeys: string[];
  onOpenKeys: (keys: string[]) => void;
}

const useOpenKeys = (
  defaultOpenKeys: string[],
  navs: INavConfig[],
  currentPath: string
): IOpenKeysType => {
  const [openKeys, setOpenKeys] = useState([...defaultOpenKeys]);

  useEffect(() => {
    if (!navs) {
      return;
    }

    navs.forEach((nav) => {
      if (!nav.subNav) {
        return;
      }
      nav.subNav.forEach((subNavItem) => {
        if (
          matchPath(currentPath, {
            path: subNavItem.key,
            exact: true,
            strict: true,
          })
        ) {
          const set = new Set<string>(openKeys);
          setOpenKeys([...set.values(), nav.key]);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navs, currentPath]);

  const onOpenKeys = (keys: string[]): void => {
    setOpenKeys([...keys]);
  };

  return {
    openKeys,
    onOpenKeys,
  };
};

export default useOpenKeys;
