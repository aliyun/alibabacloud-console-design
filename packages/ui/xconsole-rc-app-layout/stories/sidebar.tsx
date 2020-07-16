const intl = (key) => key;

export const sidebar = {
  title: 'XConsole',
  navs: [
    {
      title: intl('menu.title.overview'),
      key: '/overview',
      href: 'http://taobao.com',
      linkProps: {
        target: '_blank',
      },
    },
    {
      title: intl('menu.title.list'),
      subNav: [
        {
          title: intl('menu.title.list.basic'),
          key: '/:regionId/basic-list',
        },
        {
          title: intl('menu.title.list.selection'),
          key: '/selection-list',
          href: 'http://taobao.com',
          linkProps: {
            target: '_blank',
          },
        },
        {
          title: intl('menu.title.list.routed'),
          key: '/route-list',
          highlight: ['/route-list/:id'],
        },
      ],
    },
    {
      title: intl('menu.title.profile'),
      subNav: [
        {
          title: intl('menu.title.profile.basic'),
          key: '/basic-profile',
        },
        {
          title: intl('menu.title.profile.tab'),
          key: '/tab-profile/auth',
          highlight: ['/tab-profile/auth', '/tab-profile/groups'],
        },
      ],
    },
    {
      title: intl('menu.title.form'),
      subNav: [
        {
          title: intl('menu.title.form.basic'),
          key: '/basic-form',
        },
      ],
    },
    {
      title: intl('menu.title.result'),
      subNav: [
        {
          title: intl('menu.title.result.success'),
          key: '/success-result',
        },
        {
          title: intl('menu.title.result.fail'),
          key: '/fail-result',
        },
      ],
    },
  ],
};
