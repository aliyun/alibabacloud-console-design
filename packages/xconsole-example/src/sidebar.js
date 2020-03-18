import { intl } from '@alicloud/xconsole'

import {
  ROUTERS,
  ROUTE_PREFIX,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'

const prefix = ROUTE_PREFIX;
const __generateSubPath = (level) => {
  const ret = [];
  let levelPath = `${prefix}/p`;
  let levelPath2 = `${prefix}/proj`;

  for (let i = 1; i <= level; i++) {
    ret.push(`${levelPath}`)
    ret.push(`${levelPath}/`)
    levelPath += '/:subpath1';

    ret.push(`${levelPath2}`)
    ret.push(`${levelPath2}/`)
    levelPath2 += '/:subpath1';
  }
  // console.log(ret);
  return ret;
}

export default {
  title: intl('title.site'),
  // 默认展开的目录
  defaultOpenKeys: [
    getRoutePath(ROUTERS.DATA),
    getRoutePath(ROUTERS.SETTINGS),
  ],
  // 侧边栏缩起的匹配路由
  collapsedKeys: [
    '/success-result',
    '/fail-result',
    // getRoutePath(ROUTERS.HOME),
  ],
  invisiblePaths: __generateSubPath(10),
  navs: [
    {
      title: intl('menu.title.myapps'),
      key: getRoutePath(ROUTERS.PRODUCTS),
    },
    {
      title: intl('menu.title.dashboard'),
      key: getRoutePath(ROUTERS.DASHBOARD),
    },
    {
      title: intl('menu.title.data'),
      key: getRoutePath(ROUTERS.DATA),
      type: 'title',
      subNav: [
        {
          title: intl('menu.title.data.orders'),
          key: getRoutePath(ROUTERS.DATA_ORDERS),
          highlight: [
          ],
        },
        {
          title: intl('menu.title.data.devops'),
          key: getRoutePath(ROUTERS.DATA_DEVOPS),
          highlight: [
          ],
        },
      ],
    },
    {
      title: intl('menu.title.settings'),
      key: getRoutePath(ROUTERS.SETTINGS),
      type: 'title',
      subNav: [
        {
          title: intl('menu.title.settings.profile'),
          key: getRoutePath(ROUTERS.SETTINGS_PROFILE),
          highlight: [
          ],
        },
        {
          title: intl('menu.title.settings.account'),
          key: getRoutePath(ROUTERS.SETTINGS_ACCOUNT),
          highlight: [
          ],
        },
      ],
    },
    // {
    //   title: intl('menu.title.account'),
    //   key: '/account',
    // },
    // {
    //   title: intl('menu.title.dev'),
    //   key: '/list',
    //   type: 'title',
    //   subNav: [
    //     {
    //       title: intl('menu.title.dev.backend'),
    //       key: '/selection-list',
    //     },
    //     {
    //       title: intl('menu.title.list.routed'),
    //       key: '/route-list',
    //       highlight: [
    //         '/route-list/:id',
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: intl('menu.title.profile'),
    //   key: '/profile',
    //   type: 'title',
    //   subNav: [{
    //     title: intl('menu.title.profile.basic'),
    //     key: '/basic-profile',
    //   }, {
    //     title: intl('menu.title.profile.tab'),
    //     key: '/tab-profile/auth',
    //   }],
    // },
    // {
    //   title: intl('menu.title.form'),
    //   key: '/form',
    //   type: 'title',
    //   subNav: [{
    //     title: intl('menu.title.form.basic'),
    //     key: '/basic-form',
    //   }],
    // },
    // {
    //   title: intl('menu.title.result'),
    //   key: '/result',
    //   type: 'title',
    //   subNav: [{
    //     title: intl('menu.title.result.success'),
    //     key: '/success-result',
    //   }, {
    //     title: intl('menu.title.result.fail'),
    //     key: '/fail-result',
    //   }],
    // },
  ],
}
