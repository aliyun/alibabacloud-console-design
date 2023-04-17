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
    
    const set = new Set<string>(openKeys);

    navs.forEach((nav) => {
      let isOpen = false;

      if (nav.activePathPatterns) {
        const match = nav.activePathPatterns.find((pattern) => matchPath(currentPath, {
          path: pattern,
        }))

        if (match) {
          set.add(nav.key);
          isOpen = true;
        }
      }

      if (!nav.subNav || isOpen) {
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
          set.add(nav.key);
        }
      });
    });

    setOpenKeys([...set]);
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
