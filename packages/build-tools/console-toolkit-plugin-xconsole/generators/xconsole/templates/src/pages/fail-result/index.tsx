import React from 'react';
import { intl } from '@ali/xconsole';
import { Button, PageHeader, Result, PageProps } from '@ali/xconsole/ui';

export default (props: PageProps) => (
  <PageHeader
    title={intl('title.failresult')}
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
        text: intl('title.failresult'),
      },
    ]}
  >
    <Result
      type="error"
      title={intl('result.title.role.fail')}
      description={intl('result.description.role.fail')}
      actions={(
        <Button type="primary">{intl('result.action.role.back')}</Button>
      )}
    />
  </PageHeader>
);
