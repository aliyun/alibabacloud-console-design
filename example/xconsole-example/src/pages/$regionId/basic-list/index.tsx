import React from 'react';
import { intl } from '@alicloud/xconsole';
import { Page, PageProps } from '@alicloud/xconsole/ui';
import List from './List';

const ListPage = (props: PageProps) => {
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

ListPage.regionBarVisible = false;

export default ListPage;
