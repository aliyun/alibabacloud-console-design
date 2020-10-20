import React from 'react';
import PropTypes from 'prop-types';
import { intl } from '@ali/xconsole';
import { Button, Description, DateTime } from '@ali/xconsole/ui';
import { useOpenApi } from '@ali/xconsole/hooks';


const LogonInfo = ({ userId }) => {
  const { data } = useOpenApi('wind-demo','GetLoginProfile', { userId });
  return (
    <Description
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
      actions={(
        <Button text type="primary">
          {intl('instance.update')}
        </Button>
      )}
    />

  )
}

export default LogonInfo;
