import React from 'react';
import PropTypes from 'prop-types';
import { intl, Query, DateTime } from '@alicloud/xconsole';
import { Button, Icon, Table } from '@alicloud/xconsole/ui';

import { useOpenApi } from '@alicloud/xconsole/hooks';

const GroupList = ({ userId }) => {
  const { data, loading, run: refetch } = useOpenApi('wind-demo', 'ListGroups');
  return (
    <div className="tab-table">
      <Table
        operation={{
          primary: (
            <Button type="primary">
              {intl('list.create.ak')}
            </Button>
          ),
          secondary: (
            <Button onClick={() => refetch()}>
              <Icon type="refresh" />
            </Button>
          ),
        }}
        dataSource={data?.List || []}
        loading={loading}
        columns={[
          {
            title: intl('group.prop.gpn.label'),
            dataIndex: 'GroupPrincipalName',
          },
          {
            title: intl('group.prop.displayname.label'),
            dataIndex: 'DisplayName',
          },
          {
            title: intl('group.prop.comments.label'),
            dataIndex: 'Comments',
          },
          {
            title: intl('group.prop.create_time.label'),
            dataIndex: 'CreateDate',
            cell: value => <DateTime value={value} />,
          },
        ]}
      />
    </div>
  )
};

export default GroupList;
