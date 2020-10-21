/* eslint react/prop-types: 0 */
import React, { Fragment } from 'react';
import { intl } from '@alicloud/xconsole';
import { Tab, Page } from '@alicloud/xconsole/ui';
import UserInfo from './UserInfo';
import LogonInfo from './LogonInfo';
import AKList from './AKList';
import GroupList from './GroupList';


export default ({
  match: {
    params: {
      section,
    },
  },
  history,
}) => (
  <Page
    title={intl('title.tab.profile')}
    breadcrumbs={[
      {
        to: '/',
        text: intl('title.home'),
      },
      {
        text: intl('title.tab.profile'),
      },
    ]}
  >
    <Tab
      shape="wrapped"
      defaultActiveKey={'auth'}
      activeKey={section}
      onChange={value => history.push(value)}
    >
      <Tab.Item
        key="auth"
        title={intl('tabprofile.authentication')}
      />
      <Tab.Item
        key="groups"
        title={intl('tabprofile.groups')}
      />
    </Tab>
    {
      (!section || section === 'auth') && (
        <Fragment>
          <UserInfo />
          <LogonInfo userId={'test'} />
          <AKList />
        </Fragment>
      )
    }
    {
      section === 'groups' && <GroupList userId={'test'} />
    }
  </Page>
);
