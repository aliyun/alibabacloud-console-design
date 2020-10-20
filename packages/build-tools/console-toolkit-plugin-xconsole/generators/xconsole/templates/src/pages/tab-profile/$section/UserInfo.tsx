import React from 'react';
import PropTypes from 'prop-types';
import { intl } from '@ali/xconsole';
import { Button, Description, DateTime } from '@ali/xconsole/ui';
import { useOpenApi } from '@ali/xconsole/hooks';


const UserInfo = ({ userId }) => {
  const {data, loading} = useOpenApi('wind-demo', 'GetUser', { userId })

  return (
    <Description
      title={intl('info.instance')}
      dataSource={data}
      items={[
        {
          dataIndex: 'UserPrincipalName',
          label: intl('user.prop.upn.label'),
        },
        {
          dataIndex: 'UserId',
          label: intl('user.prop.uid.label'),
        },
        {
          dataIndex: 'DisplayName',
          label: intl('user.prop.displayname.label'),
        },
        {
          dataIndex: 'CreateDate',
          label: intl('user.prop.create_time.label'),
          render: value => (<DateTime value={value} />),
        },
        {
          dataIndex: 'Comments',
          label: intl('user.prop.comments.label'),
        },
        {
          dataIndex: 'MobilePhone',
          label: intl('user.prop.phone.label'),
        },
        {
          dataIndex: 'Email',
          label: intl('user.prop.email.label'),
        },
      ]}
      // @ts-ignore
      operation={(
        <Button text type="primary">
          {intl('instance.update')}
        </Button>
      )}
    />
  );
};

UserInfo.propTypes = {
  userId: PropTypes.string,
};

export default UserInfo;
