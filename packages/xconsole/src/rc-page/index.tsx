/* eslint-disable @typescript-eslint/interface-name-prefix */
import React from 'react';
import { History, Location } from 'history';
import { match } from 'react-router';
import PageHeader, { PageHeaderProps } from '@alicloud/xconsole-rc-page-header';
import { useHistory } from '../hooks/route';

export interface PageProps<M = any> {
  history: History;
  match: match<M>;
  location: Location;
}

export default (props: PageHeaderProps) => {
  const history = useHistory();
  return <PageHeader history={history} {...props} />;
};
