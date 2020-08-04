import React from 'react';
import { intl } from '@alicloud/xconsole';
import { useOpenApi } from '@alicloud/xconsole/hooks';
import { Button, DateTime, Description } from '@alicloud/xconsole/ui';

const InstanceDescription = () => {
  const { data, loading } = useOpenApi('wind-demo', 'DescribeInstance')
  return (
    <Description
      loading={loading}
      title={intl('info.instance')}
      dataSource={data}
      items={[
        {
          dataIndex: 'InstanceId',
          label: intl('instance.prop.id.label'),
        },
        {
          dataIndex: 'InstanceName',
          label: intl('instance.prop.name.label'),
        },
        {
          dataIndex: 'Address',
          label: intl('instance.prop.address.label'),
        },
        {
          dataIndex: 'CreateTime',
          label: intl('instance.prop.create_time.label'),
          render: value => (<DateTime value={value} />),
        },
      ]}
      operation={(
        <Button text type="primary">
          {intl('instance.update')}
        </Button>
      )}
    />
  )
};

export default InstanceDescription;
