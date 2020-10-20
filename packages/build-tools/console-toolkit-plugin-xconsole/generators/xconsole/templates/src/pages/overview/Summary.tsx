import React from 'react';
import { intl } from '@ali/xconsole';
import StatCard from './_components/StatCard';
import { useOpenApi } from '@ali/xconsole/hooks';

const LogonInfo = () => {
  const { data } = useOpenApi('wind-demo', 'GetAccountSummary');

  return (
    <StatCard
      title={intl('AccountSummaryCard_Title')}
      dataSource={data || {}}
      items={[
        {
          dataIndex: 'Users',
          title: intl('AccountSummaryCard_Users'),
          icon: 'account',
        },
        {
          dataIndex: 'Groups',
          title: intl('AccountSummaryCard_Groups'),
          icon: 'user-group-fill',
        },
        {
          dataIndex: 'Policies',
          title: intl('AccountSummaryCard_Policies'),
          icon: 'cog',
        },
        {
          dataIndex: 'Roles',
          title: intl('AccountSummaryCard_Roles'),
          icon: 'user-fill',
        },
      ]}
    />
  )
};

export default LogonInfo;
