import React from 'react';
import { intl } from '@alicloud/xconsole';
import { Page } from '@alicloud/xconsole/ui';
import InstanceList from './InstanceList';

export default () => (
  <Page
    title={intl('title.instance.list')}
    breadcrumbs={[
      {
        to: '/',
        text: intl('title.home'),
      },
      {
        text: intl('title.instance.list'),
      },
    ]}
  >
    <InstanceList />
  </Page>
);
