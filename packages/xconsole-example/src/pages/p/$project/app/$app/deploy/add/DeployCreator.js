import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  intl,
  Mutation,
  Form,
} from '@alicloud/xconsole'
import {
  Input,
  Select,
  Radio,
  Message,
} from '@alicloud/xconsole/ui'
import {
  strategyDataSource,
} from './constants'
import { AddOnlineDeploy } from '~/model'

import {
  ROUTERS,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'
import VersionsSelector from './VersionsSelector'

const InstanceCreator = ({ history, project, app, versions }) => (
  <Mutation
    mutation={AddOnlineDeploy}
    onCompleted={() => {
      Message.success('创建成功');
      history.push(getRoutePath(ROUTERS.DEPLOY, {
        project,
        app,
      }))
    }}
  >
    {
      (create, { loading, error }) => {
        if (error instanceof Error && loading) {
          Message.error('请求发生错误')
        }
        return (
          <Form
            operation={(
              <Fragment>
                <Form.Submit
                  type="primary"
                  loading={!(error instanceof Error) && loading}
                  onClick={(values) => {
                    create({ appName: app, packageVersion: values.version, title: values.title, strategy: values.strategy })
                  }}
                >
                  {intl('ui.button.ok')}
                </Form.Submit>
              </Fragment>
            )}
            items={form => [
              {
                dataIndex: 'title',
                label: intl('deploy.prop.title.label'),
                validateRules: [
                  {
                    required: true,
                    message: intl('instance.form.edit.name.error.required'),
                  },
                ],
                element: <Input />,
                initialValue: 'testTitle',
              },
              {
                dataIndex: 'version',
                label: intl('deploy.prop.version.label'),
                initialValue: versions[0] && versions[0].value,
                element: (
                  <VersionsSelector versions={versions} app={app} />
                ),
              },
              {
                dataIndex: 'strategy',
                label: intl('deploy.prop.strategy.label'),
                initialValue: '1',
                visible: true,
                element: <Radio.Group dataSource={strategyDataSource} />,
              },
            ]}
          />
        )
      }
    }
  </Mutation>
)

InstanceCreator.propTypes = {
  history: PropTypes.func,
}

export default InstanceCreator
