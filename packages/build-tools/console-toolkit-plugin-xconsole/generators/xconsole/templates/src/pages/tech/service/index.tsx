import React, { useContext } from 'react'

import { intl, ConsoleContext } from '@ali/xconsole'
import { PageHeader, Description, Grid } from '@ali/xconsole/ui'

import OpenAPI from './OpenAPI';
import InnerAPI from './InnerAPI';

export default () => {
  const { region } = useContext(ConsoleContext);
  return (
    <PageHeader
      title={intl('nav.basic.tech.request')}
      breadcrumbs={[
        {
          to: '/',
          text: intl('title.home'),
        },
        {
          text: intl('nav.basic.tech.request'),
        },
      ]}
    >
      <OpenAPI />
      <InnerAPI />

      <Description
        title="请求 ROA 风格 OpenAPI"
        items={[{
          dataIndex: 'Region',
          label: '当前 Region',
          // @ts-ignore
          span: 24,
          render: () => <b>{"const { data, loading } = useOpenApi('vpc', 'DescribeVpcs')"}</b>
        },{
          label: 'Region 的作用',
          render: () => <span>通过获取当前控制台的 Region 来用于 OpenAPI 的参数请求</span>
        }]}
        dataSource={{ Region: region.getCurrentRegionId() }}
      />
    </PageHeader>
  )
};
