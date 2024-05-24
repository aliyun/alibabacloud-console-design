import React, { ReactElement } from 'react';
import { Breadcrumb } from '@alicloud/console-components-page';
import BaseLink from '@alicloud/xconsole-rc-base-link';
import { Link } from 'react-router-dom';

export interface IBreadcrumbItem extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  link?: string;
  to?: string;
  /**
   * 是否在渲染 a 标签时添加 data-alfa-external-router
   */
  alfaExternal?: boolean;
}

export interface IProps {
  items: IBreadcrumbItem[];
}

const RcBreadcrumb = function ({ items = [] }: IProps): ReactElement {
  return (
    <Breadcrumb>
      {items.map(({ text, to, href, alfaExternal, ...restProps }) => (
        <Breadcrumb.Item key={`${text}-${to}`}>
          {
            to ? <Link to={to} href={href} {...restProps} data-alfa-external-router={alfaExternal || undefined}>{text}</Link> :
              href ? <BaseLink href={href} {...restProps}>{text}</BaseLink> : text
          }
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default RcBreadcrumb;
