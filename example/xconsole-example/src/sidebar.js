import {intl} from '@alicloud/xconsole'

export default {
  title: 'XConsole',
  defaultOpenKeys: [
    '/list',
    '/profile',
    '/profile',
    '/form',
    '/result',
  ],
  collapsedKeys: [
    '/success-result',
    '/fail-result',
  ],

  navs: [
    {
      title: intl('menu.title.overview'),
      key: '/overview',
    },
    {
      title: intl('menu.title.list'),
      key: '/list',
      type: 'title',
      subNav: [
        {
          title: intl('menu.title.list.basic'),
          key: '/:regionId/basic-list',
        },
        {
          title: intl('menu.title.list.selection'),
          key: '/selection-list',
        },
        {
          title: intl('menu.title.list.routed'),
          key: '/route-list',
          highlight: [
            '/route-list/:id',
          ],
        },
      ],
    },
    {
      title: intl('menu.title.profile'),
      key: '/profile',
      type: 'title',
      subNav: [{
        title: intl('menu.title.profile.basic'),
        key: '/basic-profile',
      }, {
        title: intl('menu.title.profile.tab'),
        key: '/tab-profile/auth',
      }],
    },
    {
      title: intl('menu.title.form'),
      key: '/form',
      type: 'title',
      subNav: [{
        title: intl('menu.title.form.basic'),
        key: '/basic-form',
      }],
    },
    {
      title: intl('menu.title.result'),
      key: '/result',
      type: 'title',
      subNav: [{
        title: intl('menu.title.result.success'),
        key: '/success-result',
      }, {
        title: intl('menu.title.result.fail'),
        key: '/fail-result',
      }],
    },
  ],
}
