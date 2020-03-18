import React, { Fragment, useState, useMemo } from 'react'
import { intl, PageHeader, Link, Query } from '@alicloud/xconsole'
import { Icon, Tag, Message, Loading } from '@alicloud/xconsole/ui'

import Card from '~/components/Card';
import XQuery from '~/components/xQuery';

import {
  GetProjects,
} from '~/model'

import {
  ROUTERS,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'


import './index.less'


export default () => {
  const [projects, setProjects] = useState([]);

  return (
    <XQuery
      model={GetProjects}
      variables={{ appName: '123' }}
      onData={(data, all) => {
        console.log('props', data);
        if (data.data && data.data.length) {
          setProjects(data.data)
        }
      }}
    >
      <XQuery.Error>
        <Message type="error">服务端返回错误，请刷新重试!</Message>
      </XQuery.Error>
      <XQuery.Loading>
        <Loading style={{ display: 'block', marginTop: '60px' }} />
      </XQuery.Loading>
      <XQuery.Default>
        <PageHeader
          title={
            <Fragment>
              {intl('menu.title.myapps')}
            </Fragment>
        }
          breadcrumbs={[
            {
              to: getRoutePath(ROUTERS.HOME),
              text: intl('title.home'),
            },
            {
              text: intl('menu.title.myapps'),
            },
          ]}
        >
          <div className="project-list">
            <Link to={getRoutePath(ROUTERS.PRODUCTS_NEW)}>
              <Card className="project-item" style={{ width: 320 }} title={'新建产品'} extra={null}>
                <div className="card-placeholder" style={{ backgroundImage: 'url(https://gw-office.alipayobjects.com/basement_prod/a3a60b37-1b0a-4402-a456-d90cfa9b1db7.png)', backgroundSize: 'contain' }} />
              </Card>
            </Link>
            { projects.map(item => (
              <Link to={getRoutePath(ROUTERS.PROJECT, {
                project: item.code,
              })}
              >
                <Card className="project-item" style={{ width: 320 }} title={item.name} extra={null}>
                  <div className="card-placeholder" style={{ backgroundImage: `url(${item.image})` }} />
                </Card>
              </Link>
            ))}
          </div>
        </PageHeader>
      </XQuery.Default>
    </XQuery>

  )
}

