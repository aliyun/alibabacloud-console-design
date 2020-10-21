import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@alicloud/xconsole/ui';
import { useOpenApi } from '@alicloud/xconsole/hooks';

const getDataSource = (list = []) => list.map(item => ({
  label: item.VpcName,
  value: item.VpcId,
}));

const VpcSelector = ({
  value,
  onChange,
  ...selectProps
}) => {
  const { data } = useOpenApi('wind-demo', 'DescribeVpcs', { regionId: 'cn-hangzhou' })

  return (
    <Select
      defaultValue={value}
      dataSource={getDataSource(data?.List || [])}
      onChange={_value => onChange(_value)}
      {...selectProps}
    />
  )
};

VpcSelector.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default VpcSelector;
