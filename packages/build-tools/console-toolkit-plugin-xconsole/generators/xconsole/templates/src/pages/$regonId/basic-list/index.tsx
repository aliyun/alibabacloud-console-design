import React from 'react';
import { intl } from '@ali/xconsole';
import { Page, PageProps } from '@ali/xconsole/ui';
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

export default ListPage;