/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { intl } from '@ali/xconsole';
import { Page } from '@ali/xconsole/ui'
import InstanceDescription from './InstanceDescription';
import GroupList from './GroupList';

const Profile = ({
  match: {
    params: {
      id,
      section,
    },
  },
  history,
}) => (
  <Page
    title={intl('title.instance.profile')}
    historyBack={'/route-list'}
    breadcrumbs={[
      {
        to: '/',
        text: intl('title.home'),
      },
      {
        to: '/route-list',
        text: intl('title.instance.list'),
      },
      {
        text: intl('title.instance.profile'),
      },
    ]}
    nav={{
      shape: 'menu',
      defaultActiveKey: 'info',
      activeKey: section,
      // @ts-ignore
      onChange: value => history.push(value),
      items: [
        {
          key: 'info',
          title: '基础信息',
        },
        {
          key: 'list',
          title: '实例列表',
        },
      ],
    }}
  >
    {
      (!section || section === 'info') && (
        <InstanceDescription instanceId={id} />
      )
    }
    {
      section === 'list' && <GroupList />
    }
  </Page>
);


Profile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};

export default Profile;
