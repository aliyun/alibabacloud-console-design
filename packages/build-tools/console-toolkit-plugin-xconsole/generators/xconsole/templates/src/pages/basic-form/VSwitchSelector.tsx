import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '@alicloud/xconsole-rc-form';
import { Select } from '@ali/xconsole/ui';
import _ from 'lodash';
import { useOpenApi } from '@ali/xconsole/hooks';

const getDataSource = (list = []) => _.map(list, item => ({
  label: item.VSwitchName,
  value: item.VSwitchId,
}));

const VSwitchSelector = ({
  value,
  onChange,
  ...selectProps
}) => {
  const form = useContext(FormContext);
  // @ts-ignore
  const [vpcId, setVpcId] = useState(form.getFieldValue('VpcId'));
  // @ts-ignore
  if (vpcId !== form.getFieldValue('VpcId')) {
    // @ts-ignore
    form.resetFields('VSwitchId');
    // @ts-ignore
    setVpcId(form.getFieldValue('VpcId'));
  }

  const { data } = useOpenApi('wind-demo', 'DescribeVSwitches', { vpcId })
  return (
    !vpcId ? (<Select {...selectProps} />) : (
      <Select
        value={value}
        dataSource={getDataSource(data?.List || [])}
        onChange={_value => onChange(_value)}
        {...selectProps}
      />)
  );
};

VSwitchSelector.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default VSwitchSelector;
