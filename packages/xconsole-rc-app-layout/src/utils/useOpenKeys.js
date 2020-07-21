import { useState, useEffect } from 'react';
import { matchPath } from 'dva/router'

const useOpenKeys = (defaultOpenKeys, navs, currentPath) => {
  const [ openKeys, setOpenKeys ] = useState([...defaultOpenKeys]);

  useEffect(() => {
    if (!navs) {
      return;
    }

    navs.forEach((nav) => {
      if (!nav.subNav) {
        return;
      }
      nav.subNav.forEach((subNavItem) => {
        if (matchPath(currentPath, { path: subNavItem.key, exact: true, strict: true })) {
          const set = new Set(openKeys);
          setOpenKeys([...set.values(), nav.key])
        }
      })
    })
  }, [defaultOpenKeys, navs, currentPath]);

  const onOpenKeys = (keys) => {
    setOpenKeys([...keys])
  }

  return {
    openKeys,
    onOpenKeys
  }
}

export default useOpenKeys;
