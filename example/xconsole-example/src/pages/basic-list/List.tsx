/* eslint react/prop-types: 0 */
import React, { useContext } from 'react';
import { intl } from '@alicloud/xconsole';
import { useOpenApi } from '@alicloud/xconsole/hooks';
import { Button, Icon, Dialog, Table, DateTime, Actions } from '@alicloud/xconsole/ui';

console.log(useOpenApi)
const { LinkButton } = Actions;

const searchConfig = {
  filter: [
    {
      label: intl('instance.prop.id.label'),
      value: 'InstanceId',
    },
    {
      label: intl('instance.prop.name.label'),
      value: 'InstanceName',
    },
  ],
  defaultFilterValue: 'InstanceId',
  placeholder: '',
};

const DeleteButton = ({
  record,
  variables,
}) => (

  <Actions>
    <LinkButton
      disabled
      onClick={() => {
        alert('on click');
      }}
    >
      详情
    </LinkButton>
    <LinkButton
      onClick={() => {
        Dialog.confirm({
          title: intl('list.delete.title'),
          content: intl('list.delete.content'),
          onOk: () => deleteItem({ InstanceId: record.InstanceId }),
        });
      }}
    >
      {intl('list.delete')}
    </LinkButton>
    <LinkButton>编辑</LinkButton>
    <LinkButton
      onClick={() => {
        alert('on click');
      }}
    >
      释放
    </LinkButton>
    <LinkButton
      disabled
      onClick={() => {
        alert('on click');
      }}
    >
      暂停
    </LinkButton>
  </Actions>
);

export default () => {
  const { data } = useOpenApi('wind-demo', 'DescribeInstances')
  return (
    <Table
      dataSource={data?.List}
      loading={!data}
      operation={{
        primary: (
          <Button type="primary">{intl('list.create')}</Button>
        ),
        secondary: (
          <Button>
            <Icon type="refresh" />
          </Button>
        ),
      }}
      search={{
        ...searchConfig,
        onSearch: (value, filterValue) => {
          // refetch({
          //   ...variables,
          //   PageNumber: 1,
          //   [filterValue]: value,
          // });
        },
      }}
      pagination={{
        current: data?.PageNumber,
        pageSize: data?.PageSize,
        total: data?.TotalCount,
        pageSizeSelector: false,
        onChange: (pageNumber) => {
          // refetch({
          //   ...variables,
          //   PageNumber: pageNumber,
          // });
        },
      }}
      columns={[
        {
          title: intl('instance.prop.name.label'),
          dataIndex: 'InstanceName',
        },
        {
          title: intl('instance.prop.address.label'),
          dataIndex: 'Address',
        },
        {
          title: intl('instance.prop.create_time.label'),
          dataIndex: 'CreateTime',
          cell: value => <DateTime value={value} />,
        },
        {
          title: intl('operation.label'),
          cell: (value, index, record) => (
            <DeleteButton
              record={record}
              // variables={variables}
            />
          ),
        },
      ]}
    />
  )
};
