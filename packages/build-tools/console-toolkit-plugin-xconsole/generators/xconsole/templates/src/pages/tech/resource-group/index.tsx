import React, { useContext } from 'react'

import { Page, Description } from '@alicloud/xconsole/ui'
import { intl, ConsoleContext } from '@alicloud/xconsole'

export default () => {
  const { region } = useContext(ConsoleContext);

  return (
    <Page
      title={intl('nav.basic.tech.resourcegroup')}
      breadcrumbs={[
        {
          to: '/',
          text: intl('title.home'),
        },
        {
          text: intl('nav.basic.tech.resourcegroup'),
        },
      ]}
    >
      <Description
        title={intl('nav.basic.tech.resourcegroup')}
        items={[{
          dataIndex: 'Region',
          label: '当前 Region',
          // @ts-ignore
          span: 24,
        },{
          label: 'Region 的作用',
          render: () => <span>通过获取当前控制台的 Region 来用于 OpenAPI 的参数请求</span>
        }]}
        dataSource={{ Region: region.getCurrentRegionId() }}
      />
    </Page>
  )
};
