import React, { ReactEventHandler, ReactElement } from 'react';
import { Breadcrumb as WindBreadcrumb } from '@alicloud/console-components-page';
import { Link } from 'dva/router';


export interface IBreadcrumbItem {
  text: string;
  to?: string;
}

export interface IProps {
  items: IBreadcrumbItem[],
}

const Breadcrumb = function({
  items = [],
}: IProps): ReactElement {
  return (
    <WindBreadcrumb>
      {
        items.map(({ text, to}, index: number) => (
          <WindBreadcrumb.Item key={index}>
            {
              to ? (
                <Link to={to}>{text}</Link>
              ) : (
                text
              )
            }
          </WindBreadcrumb.Item>
        ))
      }
    </WindBreadcrumb>
  );
};

export default Breadcrumb;