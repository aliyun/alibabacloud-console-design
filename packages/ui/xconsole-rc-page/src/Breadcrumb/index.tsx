import React, { ReactElement } from 'react';
import { Breadcrumb } from '@alicloud/console-components-page';
import { Link } from 'dva/router';

export interface IBreadcrumbItem {
  text: string;
  to?: string;
}

export interface IProps {
  items: IBreadcrumbItem[];
}

const RcBreadcrumb = function ({ items = [] }: IProps): ReactElement {
  return (
    <Breadcrumb>
      {items.map(({ text, to }) => (
        <Breadcrumb.Item key={`${text}-${to}`}>
          {to ? <Link to={to}>{text}</Link> : text}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default RcBreadcrumb;
