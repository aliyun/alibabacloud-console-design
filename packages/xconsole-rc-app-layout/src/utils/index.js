import { generatePath } from 'dva/router'
import isUndefined from 'lodash.isundefined'
import get from 'lodash.get'
import map from 'lodash.map'

export const transTitleToHeader = title => title

export const transNavToItems = (navs) => {
  return map(navs, (nav) => {
    return {
      ...nav,
      label: nav.title,
      visible: isUndefined(nav.hide) ? true : !nav.hide,
      items: isUndefined(nav.subNav) ? null : map(nav.subNav, sub => ({
        ...sub,
        label: sub.title,
        visible: isUndefined(sub.hide) ? true : !sub.hide,
      })),
    }
  })
}

const getToPath = extraParams => (routeProps, item) => {
  let path = ''
  const routeParams = get(routeProps, 'match.params') || {}
  try {
    path = generatePath(item.key, {
      ...routeParams,
      ...extraParams,
    })
  } catch (error) {
    console.warn(`[XConsole AppLayout] ${error}`)
  }
  return path
}

export const withDefaultToPath = (items, extraParams) => {
  return map(items, (item) => {
    const _item = { ...item }
    if (item.key && !item.href) {
      _item.to = getToPath(extraParams)
    }
    if (item.items) {
      _item.items = map(item.items, (i) => {
        const subItem = { ...i }
        if (!i.href) {
          subItem.to = getToPath(extraParams)
        }
        return subItem
      })
    }
    return _item
  })
}
