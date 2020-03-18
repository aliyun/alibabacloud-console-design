import React from 'react'
import PropTypes from 'prop-types'
import NavContent from './NavContent'
import { Select } from '@alicloud/console-components'
import Page from '@alicloud/console-components-page'
import { Link } from 'dva/router';
import './index.less'

const PageHeader = ({
  title,
  subTitle,
  subSwitcher,
  breadcrumbs,
  extra,
  historyBack,
  nav,
  children,
  ...restProps
}) => {

  console.log('debugme', breadcrumbs)

  const breadcrumbItems = breadcrumbs.map(({title, text, to, ...restProps}) => (
    <Page.Breadcrumb.Item key="home">
      {
        to ? (
          <Link to={to} {...restProps}>{title || text}</Link>
        ) : (
          text
        )
      }
    </Page.Breadcrumb.Item>
  ));

  return (
    <Page {...restProps}>
      <Page.Header
        breadcrumb={<Page.Breadcrumb>{breadcrumbItems}</Page.Breadcrumb>}
        breadcrumbExtra={extra}
        title={title}
        subTitle={subSwitcher ? (
          <Select
            size="small"
            {...subSwitcher}
          />
        ) : subTitle}
        hasBackArrow={!!historyBack}
        onBackArrowClick={() => {
          history.pushState(null, null, historyBack)
        }}
      />
      {
        nav ? (
          <NavContent nav={nav}>
            {children}
          </NavContent>
        ) : (
          <Page.Content>
            {children}
          </Page.Content>
        )
      }
    </Page>
  )
}

PageHeader.displayName = 'XConsoleRcPageHeader'

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  subSwitcher: PropTypes.objectOf(PropTypes.any),
  breadcrumbs: PropTypes.arrayOf(PropTypes.any),
  historyBack: PropTypes.string,
  extra: PropTypes.node,
  nav: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node,
}

export default PageHeader
