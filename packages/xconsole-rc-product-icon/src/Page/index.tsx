import React, {
  ReactNode,
  ReactElement,
  SyntheticEvent,
} from 'react';
import Page from '@alicloud/console-components-page';
import Breadcrumb, { IBreadcrumbItem } from '../Breadcrumb';

interface IProps {
  breadcrumb?: IBreadcrumbItem[];
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
}

const XconsoleRcPage = function({
  breadcrumb,
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
}: IProps): ReactElement {
  return (
    <Page>
      <Page.Header
        title={title}
        subTitle={subTitle}
        breadcrumb={<Breadcrumb items={breadcrumb} />}
        breadcrumbExtra={breadcrumbExtra}
        breadcrumbExtraAlign={breadcrumbExtraAlign}
        hasBackArrow={hasBackArrow}
        onBackArrowClick={onBackArrowClick}
        childrenAlign={titleExtraAlign}
      >
        {titleExtra}
      </Page.Header>
      <Page.Content menu={menu}>
        {children}
      </Page.Content>
    </Page>
  );
};

XconsoleRcPage.displayName = 'XConsoleRCPage';

export default XconsoleRcPage;