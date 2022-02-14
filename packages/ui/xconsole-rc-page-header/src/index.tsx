import React from 'react';
import XConsoleRcPage from '@alicloud/xconsole-rc-page';
import { Select } from '@alicloud/console-components';

import Menu from './Menu';
import { IProps } from './types';
import NavContent from './NavContent';

import './index.less';

export const PageHeader: React.FC<IProps> = (props: IProps) => {
  const {
    history,
    title,
    subTitle,
    subSwitcher,
    breadcrumbs,
    extra,
    historyBack,
    titleExtra,
    titleExtraAlign,
    nav,
    children,
    onBackArrowClick,
    hasBackArrow,
    ...restProps
  } = props;

  return (
    <XConsoleRcPage
      breadcrumbs={breadcrumbs}
      breadcrumbExtra={extra}
      titleExtra={titleExtra}
      titleExtraAlign={titleExtraAlign}
      pageProps={restProps}
      title={title}
      subTitle={
        subSwitcher ? <Select size="small" {...subSwitcher} /> : subTitle
      }
      menu={nav && nav.shape === 'menu' ? <Menu nav={nav} /> : null}
      hasBackArrow={hasBackArrow || !!historyBack}
      /* eslint-disable */
      onBackArrowClick={(): void => {
        if (onBackArrowClick) {
          return onBackArrowClick();
        }
        if (history) {
          history.push(historyBack);
        }
      }}
    >
      {
        // @ts-ignore
        nav && nav.shape === 'tab' ? (
          // @ts-ignore
          <NavContent nav={nav}>{children}</NavContent>
        ) : (
          children
        )
      }
    </XConsoleRcPage>
  );
};

PageHeader.displayName = 'XConsoleRcPageHeader';

export type PageHeaderProps = IProps;

export default PageHeader;
