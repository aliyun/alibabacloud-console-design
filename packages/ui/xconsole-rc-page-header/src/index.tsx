import React from 'react';
import { Select } from '@alicloud/console-components';
import Page from '@alicloud/console-components-page';
import { Link } from 'dva/router';
import NavContent from './NavContent';
import { IProps } from './types';

import './index.less';

const PageHeader: React.FC<IProps> = ({
  history,
  title,
  subTitle,
  subSwitcher,
  breadcrumbs,
  extra,
  historyBack,
  nav,
  children,
  onBackArrowClick,
  hasBackArrow,
  ...restProps
}: IProps) => {
  const breadcrumbItems = breadcrumbs.map(
    ({ title: linkTitle, text, to, ...restLinkProps }) => (
      <Page.Breadcrumb.Item key="home">
        {to ? (
          <Link to={to} {...restLinkProps}>
            {linkTitle || text}
          </Link>
        ) : (
          text
        )}
      </Page.Breadcrumb.Item>
    )
  );

  return (
    <Page {...restProps}>
      <Page.Header
        breadcrumb={<Page.Breadcrumb>{breadcrumbItems}</Page.Breadcrumb>}
        breadcrumbExtra={extra}
        title={title}
        subTitle={
          subSwitcher ? <Select size="small" {...subSwitcher} /> : subTitle
        }
        hasBackArrow={hasBackArrow || !!historyBack}
        onBackArrowClick={(): void => {
          if (onBackArrowClick) {
            return onBackArrowClick();
          }
          if (history) {
            history.push(historyBack);
          }
        }}
      />
      {nav ? (
        <NavContent nav={nav}>{children}</NavContent>
      ) : (
        <Page.Content>{children}</Page.Content>
      )}
    </Page>
  );
};

PageHeader.displayName = 'XConsoleRcPageHeader';

export default PageHeader;
