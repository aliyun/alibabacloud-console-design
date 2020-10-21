import React from 'react';
import { intl } from '@alicloud/xconsole';
import { Page } from '@alicloud/xconsole/ui';
import InstanceCreator from './InstanceCreator';

export default props => (
  <Page
    title={intl('title.basicform')}
    breadcrumbs={[
      {
        to: '/',
        text: intl('title.home'),
      },
      {
        text: intl('title.basicform'),
      },
    ]}
  >
    <div style={{ width: '60%' }}>
      <InstanceCreator {...props} />
    </div>
  </Page>
);
