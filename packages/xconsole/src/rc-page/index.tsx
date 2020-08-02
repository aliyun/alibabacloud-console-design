import React, { useContext, Fragment } from 'react';
// @ts-ignore
import PageHeader from '@alicloud/xconsole-rc-page-header';
import { useHistory } from '../hooks/route';

export default (props) => {

  const history = useHistory();
  return <PageHeader history={history} {...props} />;
};
