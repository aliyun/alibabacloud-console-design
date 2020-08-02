import React from 'react';
import { intl } from '@alicloud/xconsole';
import { Page } from '@alicloud/xconsole/ui';
import List from './List';

const ListPage = () => {
  return (
    <Page
      title={intl('title.basiclist')}
      breadcrumbs={[
        {
          to: '/',
          text: intl('title.home'),
        },
        {
          text: intl('title.basiclist'),
        },
      ]}
    >
      <List />
    </Page>
  )
}

export default ListPage;