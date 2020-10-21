import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { intl } from '@alicloud/xconsole';
import Form from '@alicloud/xconsole-rc-form';
import '@alicloud/xconsole-rc-form/dist/index.css';
import { useOpenApi } from '@alicloud/xconsole/hooks';
import { Input, Select, Radio } from '@alicloud/xconsole/ui';

import VpcSelector from './VpcSelector';
import VSwitchSelector from './VSwitchSelector';
import { regionDataSource, networkDataSource } from './constants';

const InstanceCreator = ({ history }) => {
  const { run: create, loading } = useOpenApi(
    'wind-demo',
    'CreateInstance',
    {},
    {
      manual: true,
      onSuccess() {
        history.push('/success-result')
      },
    }
  );
  return (
    <Form
      operation={(
        <Fragment>
          <Form.Submit
            type="primary"
            loading={loading}
            onClick={values => create(values)}
          >
            {intl('ui.button.ok')}
          </Form.Submit>
          <Form.Reset>{intl('ui.button.reset')}</Form.Reset>
        </Fragment>
      )}
      items={form => [
        {
          dataIndex: 'InstanceName',
          label: intl('instance.prop.name.label'),
          helper: intl('instance.form.edit.name.error.required'),
          validateRules: [
            {
              required: true,
              message: intl('instance.form.edit.name.error.required'),
            },
          ],
          element: <Input />,
        },
        {
          dataIndex: 'RegionId',
          label: intl('instance.prop.region.label'),
          validateRules: [
            {
              required: true,
              message: intl('instance.form.edit.region.error.required'),
            },
          ],
          element: (
            <Select
              style={{ width: '100%' }}
              dataSource={regionDataSource}
            />
          ),
        },
        {
          dataIndex: 'NetworkType',
          label: intl('instance.prop.netwrok.label'),
          initialValue: 'Classic',
          element: <Radio.Group dataSource={networkDataSource} />,
        },
        {
          dataIndex: 'VpcId',
          label: intl('instance.prop.vpc.label'),
          visible: form.getFieldValue('NetworkType') === 'VPC',
          // @ts-ignore
          element: <VpcSelector style={{ width: '100%' }} />,
        },
        {
          dataIndex: 'VSwitchId',
          label: intl('instance.prop.vswitch.label'),
          visible: form.getFieldValue('NetworkType') === 'VPC',
          // @ts-ignore
          element: <VSwitchSelector style={{ width: '100%' }} />,
        },
      ]}
    />)
};

InstanceCreator.propTypes = {
  history: PropTypes.func,
};

export default InstanceCreator;
