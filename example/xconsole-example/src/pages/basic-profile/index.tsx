import React from 'react';
import { intl } from '@alicloud/xconsole';
import { Page } from '@alicloud/xconsole/ui';
import InstanceDescription from './InstanceDescription';

export default () => (
  <Page
    title={intl('title.basicprofile')}
    breadcrumbs={[
      {
        to: '/',
        text: intl('title.home'),
      },
      {
        text: intl('title.basicprofile'),
      },
    ]}
  >
    <InstanceDescription />
  </Page>
);
