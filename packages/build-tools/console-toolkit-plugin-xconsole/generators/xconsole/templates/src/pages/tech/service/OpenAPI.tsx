import React, { useContext } from 'react'
import ReactJson from 'react-json-view'

import { useOpenApi } from '@alicloud/xconsole/hooks'
import { ConsoleContext } from '@alicloud/xconsole'
import { Description, Button, Icon } from '@alicloud/xconsole/ui'

export default () => {
  const { region } = useContext(ConsoleContext)
  const { data, loading, run: getVpcs } = useOpenApi(
    'vpc',
    'DescribeVpcs',
    { regionId: region.getCurrentRegionId() }
  );
  return (
    <Description
      title="请求 OpenApi"
      items={[{
        dataIndex: 'Region',
        label: '请求方式',
        // @ts-ignore
        render: () => <b>{"const { data, loading } = useOpenApi('vpc', 'DescribeVpcs')"}</b>
      },{
        dataIndex: 'Region',
        label: '请求数据',
        // @ts-ignore
        span: 24,
        render: () => <ReactJson src={data} collapsed={true} />
      }]}
      actions={(
        <>
          <Button
            text loading={loading}
            onClick={() => { getVpcs() }}
          >
            <Icon type="refresh"/>
          </Button>
        </>
      )}
    />
  )
};
