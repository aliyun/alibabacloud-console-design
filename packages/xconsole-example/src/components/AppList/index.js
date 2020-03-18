import React, { Fragment, useState, useMemo } from 'react'
import { intl, PageHeader, Link, Query, Table } from '@alicloud/xconsole'
import { Message, Loading, Tag } from '@alicloud/xconsole/ui'
import Actions from '@alicloud/console-components-actions'

import XQuery from '~/components/xQuery';
import {
  GetAppList,
} from '~/model'

import {
  ROUTERS,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'


export default (props) => {
  const {
    project,
    app,
    isvAppCode,
  } = props;

  const [appList, setList] = useState([]);

  return (

    <XQuery
      model={GetAppList}
      variables={{ project }}
      onData={(data) => {
        if (data.data && data.data.length) {
          setList(data.data)
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
        <Table
          primaryKey={'id'}
          dataSource={appList}
          columns={[
            {
              title: intl('application.prop.title.label'),
              dataIndex: 'title',
              cell: (value, _index, record) => (
                <Link to={getRoutePath(ROUTERS.APPLICATION, {
                  project,
                  app: record.isvAppCode,
                })}
                >{value}</Link>
              ),
            },
            {
              title: intl('application.prop.type.label'),
              dataIndex: 'type',
              cell: (value) => {
                let label = '';
                switch (`${value}`) {
                  case '1':
                    label = <Tag>后端服务</Tag>;
                    break;
                  case '2':
                    label = <Tag>WEB 应用</Tag>;
                    break;
                  case '3':
                    label = <Tag>APP 小程序</Tag>;
                    break;
                  default:
                    label = '';
                    break;
                }
                return label;
              },
            },
            {
              title: intl('application.prop.version.label'),
              dataIndex: 'version',
            },
            {
              title: intl('operation.label'),
              dataIndex: 'status',
              cell: (value, index, record) => {
                let type = '';
                switch (`${record.type}`) {
                  case '1':
                    type = 'be';
                    break;
                  case '2':
                    type = 'fe';
                    break;
                  case '3':
                    type = 'miniapp';
                    break;
                  default:
                    type = '';
                    break;
                }
                const actions = [
                  <Link to={getRoutePath(ROUTERS.ITERATION, {
                    project,
                    app: record.isvAppCode,
                  })}
                  >管理迭代</Link>,
                  <Link to={getRoutePath(ROUTERS.DEPLOY, {
                    project,
                    app: record.isvAppCode,
                  })}
                  >管理部署</Link>,
                ];

                return (
                  <Actions>
                    {actions}
                  </Actions>
                )
              },
            },
          ]}
        />
      </XQuery.Default>
    </XQuery>
  )
}

