import React from 'react';
import PropTypes from 'prop-types';
import { intl, Query } from '@ali/xconsole';
import { Button, Icon, Table, DateTime } from '@ali/xconsole/ui';
import { useOpenApi } from '@ali/xconsole/hooks';


const AKList = ({ userId }) => {
  const { data, loading, run: refetch } = useOpenApi( 'wind-demo','ListAccessKeys')

  return (
    <Table
      dataSource={data?.List || []}
      loading={loading}
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
      columns={[
        {
          title: intl('ak.prop.akid.label'),
          dataIndex: 'AccessKeyId',
        },
        {
          title: intl('ak.prop.status.label'),
          dataIndex: 'Status',
        },
        {
          title: intl('ak.prop.last_use_time.label'),
          dataIndex: 'LastUsedDate',
          cell: value => <DateTime value={value} />,
        },
      ]}
    />
  )
};

AKList.propTypes = {
  userId: PropTypes.string,
};

export default AKList;
