import React, { Fragment, useState, useMemo } from 'react'
import { intl, PageHeader } from '@alicloud/xconsole'
import { Message, Loading } from '@alicloud/xconsole/ui'

import ProjectDetail from '~/components/ProjectDetail';
import XQuery from '~/components/xQuery';
import AppList from '~/components/AppList';

import {
  GetPojectDetail,
} from '~/model'

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

  const [currentAct, setAct] = useState('overview');
  const [projectDetail, setProjectDetail] = useState(null);

  const nav = useMemo(() => ({
    shape: 'menu',
    activeKey: currentAct,
    onChange: (value) => {
      setAct(value);
    },
    items: [
      {
        key: 'overview',
        title: intl('title.product.overview'),
      },
      {
        key: 'devops',
        title: intl('title.product.devops'),
        items: [
          {
            key: 'overview2',
            title: intl('title.product.overview'),
          },
          {
            key: 'devops2',
            title: intl('title.product.devops'),
          },
        ],
      },
      {
        key: 'version',
        title: intl('title.product.version'),
      },
      {
        key: 'member',
        title: intl('title.product.member'),
      },
      {
        key: 'access',
        title: intl('title.product.access'),
      },
    ],
  }))

  const content = useMemo(() => {
    let ret = null;
    console.log('projectDetail', projectDetail);

    if (!projectDetail) {
      return null;
    }
    switch (currentAct) {
      case 'overview':
        ret = <ProjectDetail data={projectDetail} project={project} />
        break;
      case 'devops':
        ret = <AppList data={projectDetail} project={project} />
        break;
      default:
        break;
    }
    return ret;
  }, [projectDetail, currentAct])

  return (
    <XQuery
      model={GetPojectDetail}
      variables={{ project }}
      onData={(data) => {
        if (data && data.name) {
          setProjectDetail(data)
        }
      }}
    >
      <XQuery.Error>
        <Message type="error">服务端返回错误，请刷新重试!</Message>
      </XQuery.Error>
      <XQuery.Loading>
        <Loading size="small" style={{ display: 'block', marginTop: '60px' }} />
      </XQuery.Loading>
      <XQuery.Default>
        <PageHeader
          title={
            <Fragment>
              {projectDetail ? `${projectDetail.name} / ` : ''} {project}
            </Fragment>
            }
          nav={nav}
          breadcrumbs={[
            {
              to: getRoutePath(ROUTERS.HOME),
              text: intl('title.home'),
            },
            {
              to: getRoutePath(ROUTERS.PRODUCTS),
              text: intl('menu.title.myapps'),
            },

          ]}
        >
          {content}
        </PageHeader>
      </XQuery.Default>
    </XQuery>
  )
}

