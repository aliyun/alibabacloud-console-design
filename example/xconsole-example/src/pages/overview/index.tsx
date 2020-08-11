import React from 'react';
import { intl } from '@alicloud/xconsole';
import { Page, PageProps } from '@alicloud/xconsole/ui';
import Layout from './_components/Layout';
import Summary from './Summary';
import Account from './Account';


export default () => (
  <Page
    style={{ background: '#fafafa', height: '100%' }}
    title={intl('title.overview')}
    breadcrumbs={[
      {
        link: '/',
        text: intl('title.home'),
      },
      {
        text: intl('title.overview'),
      },
    ]}
  >
    <Layout
      leftItems={[<Summary />]}
      rightItems={[<Account />]}
    />
  </Page>
);

