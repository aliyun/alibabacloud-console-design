import React, { ReactNode, SyntheticEvent } from 'react';
import Page, { IPageProps } from '@alicloud/console-components-page';
import Breadcrumb, { IBreadcrumbItem } from '../Breadcrumb';

interface IProps {
  breadcrumbs?: IBreadcrumbItem[];
  breadcrumbExtra?: ReactNode;
  breadcrumbExtraAlign?: 'left' | 'right';
  title?: ReactNode;
  subTitle?: ReactNode;
  titleExtra?: ReactNode;
  titleExtraAlign?: 'left' | 'right';
  hasBackArrow?: boolean;
  onBackArrowClick?: (e: SyntheticEvent) => void | never;
  menu?: ReactNode;
  children?: ReactNode;
  pageProps?: IPageProps;
}

const XconsoleRcPage: React.FC<IProps> = (props: IProps) => {
  const {
    breadcrumbs,
    breadcrumbExtra,
    breadcrumbExtraAlign,
    title,
    subTitle,
    titleExtra,
    titleExtraAlign,
    hasBackArrow,
    onBackArrowClick,
    menu,
    children,
    pageProps,
  } = props;

  return (
    <Page {...pageProps}>
      <Page.Header
        title={title}
        subTitle={subTitle}
        breadcrumb={breadcrumbs?.length ? <Breadcrumb items={breadcrumbs} /> : null}
        breadcrumbExtra={breadcrumbExtra}
        breadcrumbExtraAlign={breadcrumbExtraAlign}
        hasBackArrow={hasBackArrow}
        onBackArrowClick={onBackArrowClick}
        childrenAlign={titleExtraAlign}
      >
        {titleExtra}
      </Page.Header>
      <Page.Content menu={menu}>{children}</Page.Content>
    </Page>
  );
};

XconsoleRcPage.displayName = 'XConsoleRCPage';

export default XconsoleRcPage;
