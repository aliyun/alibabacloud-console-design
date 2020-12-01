import { Location } from 'history'
import { intl } from '@alicloud/xconsole/utils'

export default (location: Location) => {
  return {
    title: 'XConsole',
    navs: [
      {
        title: intl('nav.basic.ui.scence'),
        key: '/ui',
        subNav: [
          {
            title: intl('menu.title.overview'),
            key: '/overview',
          },
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
          {
            title: intl('menu.title.profile.basic'),
            key: '/basic-profile',
          }, {
            title: intl('menu.title.profile.tab'),
            key: '/tab-profile/auth',
          },
          {
            title: intl('menu.title.form.basic'),
            key: '/basic-form',
          },
          {
            title: intl('menu.title.result.success'),
            key: '/success-result',
          },
          {
            title: intl('menu.title.result.fail'),
            key: '/fail-result',
          }
        ]
      },
      {
        key: '/ui',
        type: 'divider'
      },
      {
        title: intl('nav.basic.tech'),
        key: '/tech',
        subNav: [
          {
            title: intl('nav.basic.tech.region'),
            key: '/tech/region'
          },
          {
            title: intl('nav.basic.tech.microfrontend'),
            key: '/tech/micro-front-end'
          }
        ]
      },
    ],
  }
};
