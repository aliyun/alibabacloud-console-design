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
  GetIterations,
  RollbackDeploy,
  AddIteration,
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

const ReviewButton = ({
  record,
  variables,
}) => (
  <Mutation
    mutation={RollbackDeploy}
    refetchQuery={() => ({ query: GetIterations, variables })}
  >
    {
      doAction => (
        <LinkButton
          text
          onClick={() => (
            Dialog.confirm({
              title: intl('iteration.action.review.title'),
              content: intl('iteration.action.review.notice'),
              onOk: () => doAction({ InstanceId: record.InstanceId }),
            })
          )}
        >
          { intl('action.iteration.review') }
        </LinkButton>
      )
    }
  </Mutation>
)

const LogButton = ({
  record,
  variables,
  project,
  app,
}) => (
  <Mutation
    mutation={RollbackDeploy}
    refetchQuery={() => ({ query: GetIterations, variables })}
  >
    {
      doAction => (
        <Link
          to={getRoutePath(ROUTERS.ITERATION_DETAIL, {
            project,
            app,
            iterationId: record.packageVersion,
          })}
        >
          { record.status === 0 ? intl('action.iteration.startpack') : intl('action.iteration.log') }
        </Link>
      )
    }
  </Mutation>
)

export default ({ project, app, appDetail, history }) => (
  <Query
    query={GetIterations}
    variables={{ appName: app, appDetail }}
  >
    {
        ({ data, error, loading: listLoading, refetch, variables }) => {
          const isLoading = (!(error instanceof Error) && listLoading);
          const dataSource = (error instanceof Error && listLoading) ? [] : data.data;
          return (
            <Table
              primaryKey={'InstanceId'}
              rowSelection={{ mode: 'multiple' }}
              dataSource={dataSource}
              loading={isLoading}
              operation={{
                primary: (
                  <div className="table-actions">
                    <Mutation
                      mutation={AddIteration}
                      refetchQuery={(record) => {
                        if (record.version) {
                          history.push(getRoutePath(ROUTERS.ITERATION_DETAIL, {
                            project,
                            app,
                            iterationId: record.version,
                          }))
                        }
                        return ({
                          query: GetIterations,
                          variables: { appName: app, appDetail },
                        })
                      }}
                    >
                      {
                      (doAction, { data: __data, loading, ...others }) =>
                        // console.log('muration data', __data)
                        (
                          <Balloon
                            closable={false}
                            align={'tr'}
                            trigger={
                              <Button
                                type="primary"
                                disabled={isLoading || data.packItemCount > 0}
                                loading={loading}
                                onClick={async () => {
                                  const result = await doAction({ appName: app })
                                  console.log(others);
                                }}
                              >
                                { intl('action.iteration.add') }
                              </Button>
                    }
                          >
                            有构建中任务时，不能创建新的构建任务
                          </Balloon>
                        )

                    }
                    </Mutation>
                  </div>
                ),
                secondary: (
                  <Button onClick={() => refetch(variables)}>
                    <Icon type="refresh" />
                  </Button>
                ),
              }}
              pagination={{
                current: data.page,
                pageSize: data.pageSize,
                total: data.total,
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
                  title: intl('pack.prop.title.label'),
                  dataIndex: 'packageVersion',
                  width: 220,
                  cell: (value, __index, record) => (<Link
                    to={getRoutePath(ROUTERS.ITERATION_DETAIL, {
                      project,
                      app,
                      iterationId: record.packageVersion,
                    })}
                  >
                    {value}
                  </Link>),
                },
                {
                  title: intl('pack.prop.status.label'),
                  dataIndex: 'status',
                  width: 120,
                  cell: (value) => {
                    let label = '';
                    switch (`${value}`) {
                      case '0':
                        label = (<StatusIndicator type="loading" shape="icon">
                          新建构建
                        </StatusIndicator>);
                        break;
                      case '1':
                        label = (<StatusIndicator type="loading" shape="icon">
                          构建中
                        </StatusIndicator>);
                        break;
                      case '2':
                      case '5':
                      case '6':
                      case '7':
                        label = (<StatusIndicator type="success" shape="icon">
                          构建成功
                        </StatusIndicator>);
                        break;
                      case '3':
                        label = (<StatusIndicator type="error" shape="icon">
                          构建失败
                        </StatusIndicator>);
                        break;
                      case '4':
                        label = (<StatusIndicator type="disabled" shape="icon">
                          构建已取消
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
                  title: intl('pack.prop.gmtModified.label'),
                  dataIndex: 'gmtModified',
                  width: 100,
                  cell: value => '3分钟前',
                },
                {
                  title: intl('pack.prop.gmtCreate.label'),
                  dataIndex: 'gmtCreate',
                  width: 220,
                  cell: value => <DateTime value={value} />,
                },
                {
                  title: intl('operation.label'),
                  dataIndex: 'status',
                  cell: (value, index, record) => {
                    const actions = [];

                    if (record.status === 0 || record.status === 1) {
                      actions.push(<LogButton
                        record={record}
                        variables={variables}
                        project={project}
                        app={app}
                      />)
                    }


                    // 只有构建完成的才能是提交审核
                    // if (record.status === 2) {
                    //   actions.push(<ReviewButton
                    //     record={record}
                    //     variables={variables}
                    //     project={project}
                    //     app={app}
                    //   />)
                    // }

                    // TODO
                    // if (record.status === 5) {
                    //   actions.push(<Link>{intl('action.iteration.reviewing')}</Link>)
                    // }

                    // if (record.status === 6) {
                    //   actions.push(<Link>{intl('action.iteration.reviewed')}</Link>)
                    // }

                    // if (record.status === 7) {
                    //   actions.push(<Link>{intl('action.iteration.reviewagain')}</Link>)
                    // }


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
