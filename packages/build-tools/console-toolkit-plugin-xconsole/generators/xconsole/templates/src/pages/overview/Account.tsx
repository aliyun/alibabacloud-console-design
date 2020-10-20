import React from 'react';
import { intl } from '@ali/xconsole';
import { Card, Button } from '@ali/xconsole/ui';

const CardProps = {
  showTitleBullet: false,
  showHeadDivider: false,
  contentHeight: 'auto',
};

const Account = () => (
  <Card
    {...CardProps}
    title={intl('account.management')}
  >
    <div>
      <span style={{ color: '#CCCCCC' }}>
        <span>{intl('User_login_Link')}</span>
        <a>https://signin.aliyun.com/xxx.onaliyun.com/login.htm</a>
      </span>
    </div>
    <div style={{ marginTop: 8 }}>
      <Button size="small" >
        {intl('AccountManagement_Custom_Domain')}
      </Button>
    </div>
  </Card>
);

export default Account;
