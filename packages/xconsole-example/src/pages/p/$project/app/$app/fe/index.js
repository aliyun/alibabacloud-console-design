/*
* useSubRouter: true
*/
import React from 'react'
import { intl, PageHeader, Link, Widget } from '@alicloud/xconsole'
import {
  ROUTERS,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'

export default (props) => {
  const {
    match: {
      params: {
        project,
      },
    },
  } = props;

  return (
    <PageHeader
      title={'WEB 应用开发暂未开放'}
      historyBack={`/p/${project}`}
      breadcrumbs={[
        {
          link: getRoutePath(ROUTERS.HOME),
          text: intl('title.home'),
        },
        {
          text: intl('title.comingsoon'),
        },
      ]}
    >
      <Widget
        id="@ali/widget-xconsole-result"
        version="1.x"
        type="success"
        title={'暂未开放'}
        description={'努力开发中，请耐心等待~~'}
        actions={(
          <Link to={`/p/${project}`}>返回</Link>
      )}
      />
    </PageHeader>
  )
}
