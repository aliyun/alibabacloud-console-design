import React from 'react';
import { Link } from 'dva/router';
import { intl } from '@alicloud/xconsole';
import { useOpenApi } from '@alicloud/xconsole/hooks';
import { DateTime, Table } from '@alicloud/xconsole/ui';

export default () => {
  const { data, loading } = useOpenApi('wind-demo','DescribeInstances')
  return (
    <Table
      dataSource={data?.List || []}
      loading={loading}
      columns={[
        {
          title: intl('instance.prop.name.label'),
          dataIndex: 'InstanceName',
          cell: (value, index, record) => (
            <Link to={`/route-list/${record.InstanceId}/info`} relative>{record.InstanceId}</Link>
          ),
        },
        {
          title: intl('instance.prop.address.label'),
          dataIndex: 'Address',
        },
        {
          title: intl('instance.prop.create_time.label'),
          dataIndex: 'CreateTime',
          cell: value => <DateTime value={value} />,
        },
      ]}
    />
  )
};
