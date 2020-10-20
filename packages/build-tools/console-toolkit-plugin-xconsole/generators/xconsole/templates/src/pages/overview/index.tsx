import React from 'react';
import { intl } from '@ali/xconsole';
import { Page } from '@ali/xconsole/ui';
import Layout from './_components/Layout';
import Summary from './Summary';
import Account from './Account';


export default () => (
  <Page
    title={intl('title.overview')}
    breadcrumbs={[
      {
        to: '/',
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

