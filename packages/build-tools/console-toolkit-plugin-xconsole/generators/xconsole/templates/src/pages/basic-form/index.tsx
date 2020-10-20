import React from 'react';
import { intl } from '@ali/xconsole';
import { Page } from '@ali/xconsole/ui';
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
