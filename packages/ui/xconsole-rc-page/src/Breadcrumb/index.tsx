import React, { ReactElement } from 'react';
import { Breadcrumb } from '@alicloud/console-components-page';
import BaseLink from '@alicloud/xconsole-rc-base-link';
import { Link } from 'dva/router';

export interface IBreadcrumbItem extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  link?: string;
  to?: string;
}

export interface IProps {
  items: IBreadcrumbItem[];
}

const RcBreadcrumb = function ({ items = [] }: IProps): ReactElement {
  return (
    <Breadcrumb>
      {items.map(({ text, to, href, ...restProps }) => (
        <Breadcrumb.Item key={`${text}-${to}`}>
          {
            to ? <Link to={to} href={href} {...restProps}>{text}</Link> :
              href ? <BaseLink href={href} {...restProps}>{text}</BaseLink> : text
          }
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default RcBreadcrumb;
