import React from 'react'
import { Description, Button, Icon } from '@ali/xconsole/ui'
import { useInnerApi } from '@ali/xconsole/hooks'
import ReactJson from 'react-json-view'

export default () => {
  const { data, loading, run: getFlows } = useInnerApi('composer-inner', 'InvokeFlow');
  return (
    <Description
      title="请求 InnerAPI"
      items={[{
        dataIndex: 'Region',
        label: '请求方式',
        // @ts-ignore
        render: () => <b>{"const { data, loading } = useInnerApi('composer-inner', 'InvokeFlow')"}</b>
      },{
        dataIndex: 'Region',
        label: '请求数据',
        // @ts-ignore
        span: 24,
        render: () => <ReactJson src={data} collapsed={true} />
      }]}
      actions={(
        <Button
          text loading={loading}
          onClick={() => {
            getFlows()
          }}
        >
          <Icon type="refresh"/>
        </Button>
      )}
    />
  )
};
