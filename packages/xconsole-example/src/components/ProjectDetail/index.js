import React, { Fragment } from 'react'
import { Link, DataFields } from '@alicloud/xconsole'
import { Icon, Tag } from '@alicloud/xconsole/ui'

import AppList from '~/components/AppList';

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
    data,
    project,
  } = props;


  const items = [
    {
      dataIndex: 'isvCode',
      label: '服务商',
      render: (val, { isvAlias }) => (
        <Fragment>
          {val} (别名: {isvAlias})
        </Fragment>
      ),
    },
    {
      dataIndex: 'projectCode',
      label: '项目',
      render: (val, { aliasCode }) => (
        <Fragment>
          {val} (别名: {aliasCode})
        </Fragment>
      ),
    },
    {
      dataIndex: 'status',
      label: '上架状态',
      render: (val) => {
        let label = '';
        switch (`${val}`) {
          case '0':
            label = '开发中,待上架';
            break;
          case '1':
            label = '已上架';
            break;
          default:
            label = '--';
            break;
        }
        return (
          <Fragment>
            <Tag>{label}</Tag>
          </Fragment>
        );
      },
    },
    {
      dataIndex: 'type',
      label: '项目类型',
      render: (val) => {
        let label = '';
        switch (`${val}`) {
          case '1':
            label = '集成模式';
            break;
          case '2':
            label = '外链模式';
            break;
          default:
            label = '--';
            break;
        }
        return (
          <Fragment>
            <Tag>{label}</Tag>
            <Link href="#"><Icon type="help" size="xs" style={{ marginLeft: '16px' }} /></Link>
          </Fragment>
        );
      },
    },
    {
      dataIndex: 'services',
      label: '服务列表',
      render: (services, { isv, isvAlias, projectAlias }) => {
        console.log('props 2', { project, projectAlias })
        return (
          <AppList project={project} isvAppCode={projectAlias} />
        )
      },
      span: 24,
      style: {
        lineHeight: '24px',
      },
    },
    {
      label: '相关地址',
      render: (val, { isvCode, isvAlias, aliasCode, projectCode }) => {
        const appId = `${isvAlias || isvCode}-${aliasCode || projectCode}`
        return (
          <Fragment>
            <Link href={`https://work.console.aliyun.com/apps/${appId}`} target="_blank">应用中心介绍页</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href={`https://work.console.aliyun.com/${appId}`} target="_blank">应用详情页</Link>
          </Fragment>
        )
      },
      style: {
        lineHeight: '24px',
      },
    },
    {
      dataIndex: 'description',
      label: '描述',
      span: 24,
    },
  ];

  return (
    <DataFields dataSource={data} items={items} />
  )
}

