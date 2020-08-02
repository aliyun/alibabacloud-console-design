import React from 'react';
import { intl } from '@alicloud/xconsole';
import { Button, PageHeader, Result } from '@alicloud/xconsole/ui';

export default () => (
  <PageHeader
    title={intl('title.successresult')}
    breadcrumbs={[
      {
        to: '/',
        text: intl('title.home'),
      },
      {
        to: '/',
        text: intl('title.result'),
      },
      {
        text: intl('title.successresult'),
      },
    ]}
  >
    <Result
      type="success"
      title={intl('result.title.role.created')}
      description={intl('result.description.role.created')}
      actions={(
        <Button type="primary">
          {intl('result.action.role.auth')}
        </Button>
      )}
    />
  </PageHeader>
);

