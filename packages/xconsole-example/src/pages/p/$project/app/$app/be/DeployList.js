/* eslint react/prop-types: 0 */
import React, { useState } from 'react'
import { Button, Icon, Dialog, Balloon } from '@alicloud/xconsole/ui'
import { Table, DateTime} from '@alicloud/xconsole'
import Actions, { LinkButton } from '@alicloud/console-components-actions'
import StatusIndicator from '@alicloud/console-components-status-indicator';

import CloudShell from '@ali/cloudshell-js-sdk'

import {
  intl,
  Query,
  Mutation,
  Link,
} from '@alicloud/xconsole'
import {
  GetDeployList,
  CancelDeploy,
  RetryDeploy,
  ResumeDeploy,
  RollbackDeploy,
} from '~/model'


import {
  ROUTERS,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'

const searchConfig = {
  filter: [
    {
      label: intl('deploy.prop.status.label'),
      value: 'status',
    },
    {
      label: intl('deploy.prop.env.label'),
      value: 'env',
    },
    {
      label: intl('deploy.prop.type.label'),
      value: 'type',
    },
  ],
  defaultFilterValue: 'type',
  placeholder: '',
}

const RollbackButton = ({
  record,
  variables,
}) => (
  <Mutation
    mutation={RollbackDeploy}
    refetchQuery={() => ({ query: GetDeployList, variables })}
  >
    {
      doAction => (
        <LinkButton
          text
          onClick={() => (
            Dialog.confirm({
              title: intl('deploy.action.rollback.title'),
              content: intl('deploy.action.rollback.notice'),
              onOk: () => doAction({ deploymentId: record.id, strategy: 1, ...variables }),
            })
          )}
        >
          { intl('action.deploy.rollback') }
        </LinkButton>
      )
    }
  </Mutation>
)

const CancelButton = ({
  record,
  variables,
}) => (
  <Mutation
    mutation={CancelDeploy}
    refetchQuery={[]}
  >
    {
      doAction => (
        <LinkButton
          text
          onClick={() => (
            Dialog.confirm({
              title: intl('deploy.action.cancel.title'),
              content: intl('deploy.action.cancel.notice'),
              onOk: () => doAction({ deploymentId: record.id, ...variables }),
            })
          )}
        >
          { intl('action.deploy.cancel') }
        </LinkButton>
      )
    }
  </Mutation>
)

const ResumeButton = ({
  record,
  variables,
}) => (
  <Mutation
    mutation={ResumeDeploy}
    refetchQuery={() => ({ query: GetDeployList, variables })}
  >
    {
      doAction => (
        <LinkButton
          text
          onClick={() => (
            Dialog.confirm({
              title: intl('deploy.action.resume.title'),
              content: intl('deploy.action.resume.notice'),
              onOk: () => doAction({ deploymentId: record.id, ...variables }),
            })
          )}
        >
          { intl('action.deploy.resume') }
        </LinkButton>
      )
    }
  </Mutation>
)

export default ({ project, app, history }) => {
  const showDeployAdd = () => {
    history.push(getRoutePath(ROUTERS.DEPLOY_ADD, {
      project,
      app,
    }))
  }


  return (
    <Query
      query={GetDeployList}
      variables={{ AppName: app }}
    >
      {
        ({ data, error, loading, refetch, variables }) => {
          const isLoading = (!(error instanceof Error) && loading);
          const dataSource = (error instanceof Error && loading) ? [] : data.data;
          return (
            <Table
              primaryKey={'InstanceId'}
              rowSelection={{ mode: 'multiple' }}
              dataSource={dataSource}
              loading={isLoading}
              operation={{
                primary: (
                  <div className="table-actions">
                    <Balloon
                      closable={false}
                      align={'tr'}
                      trigger={
                        <Button
                          disabled={loading || data.haveDeployingItem === true}
                          type="primary"
                          onClick={showDeployAdd}
                        >
                          { intl('action.deploy.add') }
                        </Button>
                    }
                    >
                      有部署中任务时，不能创建新的部署任务
                    </Balloon>
                  </div>
                ),
                secondary: (
                  <Button onClick={() => refetch(variables)}>
                    <Icon type="refresh" />
                  </Button>
                ),
              }}
              pagination={{
                current: data.PageNumber,
                pageSize: data.PageSize,
                total: data.TotalCount,
                pageSizeSelector: false,
                onChange: (pageNumber) => {
                  refetch({
                    ...variables,
                    PageNumber: pageNumber,
                  })
                },
              }}
              columns={[
                {
                  title: intl('deploy.prop.title.label'),
                  dataIndex: 'title',
                },
                {
                  title: intl('deploy.prop.env.label'),
                  dataIndex: 'env',
                  cell: (value) => {
                    let label = '';
                    switch (`${value}`) {
                      case '0':
                        label = '日常';
                        break;
                      case '1':
                        label = '预发';
                        break;
                      case '2':
                        label = '线上';
                        break;
                      default:
                        label = '';
                        break;
                    }
                    return label;
                  },
                },
                {
                  title: intl('deploy.prop.type.label'),
                  dataIndex: 'type',
                  cell: (value) => {
                    let label = '';
                    switch (`${value}`) {
                      case '0':
                        label = '发布';
                        break;
                      case '1':
                        label = '回滚';
                        break;
                      default:
                        label = '';
                        break;
                    }
                    return label;
                  },
                },
                {
                  title: intl('deploy.prop.version.label'),
                  dataIndex: 'packageVersion',
                },
                {
                  title: intl('deploy.prop.status.label'),
                  dataIndex: 'status',
                  width: 120,
                  cell: (value) => {
                    let label = '';
                    switch (`${value}`) {
                      case '0':
                        label = (<StatusIndicator type="loading" shape="icon">
                          新建部署
                        </StatusIndicator>);
                        break;
                      case '1':
                        label = (<StatusIndicator type="loading" shape="icon">
                          部署中
                        </StatusIndicator>);
                        break;
                      case '2':
                        label = (<StatusIndicator type="success" shape="icon">
                          部署成功
                        </StatusIndicator>);
                        break;
                      case '3':
                        label = (<StatusIndicator type="error" shape="icon">
                          部署失败
                        </StatusIndicator>);
                        break;
                      case '4':
                        label = (<StatusIndicator type="disabled" shape="icon">
                          已取消
                        </StatusIndicator>);
                        break;
                      default:
                        label = '';
                        break;
                    }
                    return label;
                  },
                },
                {
                  title: intl('deploy.prop.gmtCreate.label'),
                  dataIndex: 'gmtCreate',
                  cell: value => <DateTime value={value} />,
                },
                {
                  title: intl('operation.label'),
                  dataIndex: 'status',
                  cell: (value, index, record) => {
                    const actions = [];

                    if (record.status == '2') {
                      actions.push(<RollbackButton
                        record={record}
                        variables={variables}
                      />)
                    }

                    if (record.status == '0' || record.status == '1') {
                      actions.push(<CancelButton
                        record={record}
                        variables={variables}
                      />)
                    }

                    if (record.continue === '1') {
                      actions.push(<ResumeButton
                        record={record}
                        variables={variables}
                      />)
                    }

                    return (
                      <Actions>
                        {actions}
                      </Actions>
                    )
                  },
                },
              ]}
            />
          )
        }
      }
    </Query>
  )
}
