import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { RegionContext } from '@alicloud/xconsole-region-context'
import ConsoleMenu from '@alicloud/console-components-console-menu/lib/RoutableMenu'
import { generatePath } from 'dva/router'
import map from 'lodash.map'
import get from 'lodash.get'
import isUndefined from 'lodash.isundefined'

const tryGeneratePath = (key, params) => {
  let path
  try {
    path = generatePath(key, params)
  } catch (error) {
    console.warn(`[XConsole AppLayout] ${error}`)
    return ''
  }
  return path
}

const Nav = ({
  header,
  items,
  title,
  navs,
  collapsedKeys,
  ...restProps
}) => {
  const regionParams = useContext(RegionContext) || {}
  const param = regionParams ? { regionId: regionParams.activeRegionId } : {}
  const getMenuItems = () => {
    if (isUndefined(navs)) {
      console.warn('[XConsoleAppLayout] sidebar.navs is required')
      return []
    }

    return map(navs, (nav) => {
      let determinedNav = {
        ...nav,
        label: nav.title,
      }
      if (nav.key && !nav.href) {
        determinedNav = {
          ...determinedNav,
          to: (routeProps, item) => {
            const params = get(routeProps, 'match.params')
            return tryGeneratePath(item.key, {
              ...params,
              ...param,
            })
          },
        }
      }
      if (nav.subNav) {
        determinedNav = {
          ...determinedNav,
          label: nav.title,
          items: map(determinedNav.subNav, (subNavItem) => {
            let _subNavItem = {
              ...subNavItem,
              label: subNavItem.title,
            }
            if (subNavItem.key && !subNavItem.href) {
              _subNavItem = {
                ..._subNavItem,
                to: (routeProps, item) => {
                  const params = get(routeProps, 'match.params')
                  return tryGeneratePath(item.key, {
                    ...params,
                    ...param,
                  })
                },
              }
            }
            return _subNavItem
          }),
        }
      }
      return determinedNav
    })
  }

  return (
    <ConsoleMenu
      header={header || title}
      items={items || getMenuItems()}
      {...restProps}
    />
  )
}

Nav.propTypes = {
  header: PropTypes.node,
  title: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.any),
  navs: PropTypes.arrayOf(PropTypes.any),
}

export default Nav
