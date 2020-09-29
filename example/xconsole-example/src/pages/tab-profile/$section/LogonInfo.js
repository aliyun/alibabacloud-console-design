import React from 'react';
import PropTypes from 'prop-types';
import { intl } from '@alicloud/xconsole';
import { Button, Description, DateTime } from '@alicloud/xconsole/ui';
import { useOpenApi } from '@alicloud/xconsole/hooks';


const LogonInfo = ({ userId }) => {
  const { data, loading } = useOpenApi('wind-demo','GetLoginProfile', { userId });
  return (
    <Description
      loading={loading}
      title={intl('info.instance')}
      dataSource={data}
      items={[
        {
          dataIndex: 'MFABindRequired',
          label: intl('logon.prop.mfa.label'),
        },
        {
          dataIndex: 'PasswordResetRequired',
          label: intl('logon.prop.password_reset.label'),
        },
        {
          dataIndex: 'LastUseDate',
          label: intl('user.prop.last_use_time.label'),
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
}

export default LogonInfo;
