/* eslint react/prop-types: 0 */
import React, { useState, Fragment } from 'react'
import { Button, Icon, Dialog, Balloon } from '@alicloud/xconsole/ui'
import { Table, DateTime} from '@alicloud/xconsole'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

import Actions, { LinkButton } from '@alicloud/console-components-actions'
import StatusIndicator from '@alicloud/console-components-status-indicator';


import {
  EIterationStatus,
  ROUTERS,
} from '~/constants';

import {
  intl,
  Query,
  Mutation,
  Link,
} from '@alicloud/xconsole'
import {
  AddIteration,
  GetIterations,
} from '~/model'


import {
  getRoutePath,
} from '~/utils/helper'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const ViewLog = () => (
  <LinkButton
    to={'#'}
  >
    {intl('action.iteration.viewLog')}
  </LinkButton>
)

const OnlineDeploy = () => (
  <LinkButton
    to={'#'}
  >
    {intl('action.iteration.onlineDeploy') }
  </LinkButton>
)

const DailyDeploy = () => (
  <LinkButton
    to={'#'}
  >
    {intl('action.iteration.dailyDeploy') }
  </LinkButton>
)

const DeleteIteration = () => (
  <LinkButton
    to={'#'}
  >
    {intl('action.iteration.deleteIteration') }
  </LinkButton>
)

const SubmitAudit = () => (
  <LinkButton
    to={'#'}
  >
    {intl('action.iteration.submitAudit') }
  </LinkButton>
)

const CancelAudit = () => (
  <LinkButton
    to={'#'}
  >
    {intl('action.iteration.cancelAudit') }
  </LinkButton>
)


export default ({ project, app, appDetail, history }) => {
  console.log('iterationLoading');

  return (
    <Query
      query={GetIterations}
      variables={{ appName: app, appDetail }}
      onComplete={() => {
        console.log('GetIterations complete!')
      }}
      onError={() => {
        console.log('GetIterations error!')
      }}
    >
      {
          ({ data, error, loading: listLoading, refetch, variables }) => {
            const isLoading = (!(error instanceof Error) && listLoading);
            const dataSource = (error instanceof Error && listLoading) ? [] : data.data;
            return (
              <Table
                className="iteration-list"
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
                    dataIndex: 'name',
                    width: 220,
                    cell: (value, __index, record) => (
                      <Fragment>
                        <Link
                          to={getRoutePath(ROUTERS.ITERATION_DETAIL, {
                            project,
                            app,
                            iterationId: record.id,
                          })}
                        >
                          {record.repoBranch} / {record.version}
                        </Link>
                        <p>{value}</p>
                      </Fragment>),
                  },
                  {
                    title: intl('pack.prop.status.label'),
                    dataIndex: 'status',
                    width: 120,
                    cell: (value) => {
                      let label = '';
                      switch (value) {
                        case EIterationStatus.PUBLISH_FAIL:
                          label = (<StatusIndicator type="error" shape="icon">
                            发布失败
                          </StatusIndicator>);
                          break;
                        case EIterationStatus.AUDIT_DISAPPROVED:
                          label = (<StatusIndicator type="warning" shape="icon">
                            审核未通过
                          </StatusIndicator>);
                          break;
                        case EIterationStatus.DELETED:
                          label = (<StatusIndicator type="warning" shape="icon">
                            迭代已废弃
                          </StatusIndicator>);
                          break;
                        case EIterationStatus.ONGOING:
                          label = (<StatusIndicator type="info" shape="icon">
                            迭代进行中
                          </StatusIndicator>);
                          break;
                        case EIterationStatus.AUDITING:
                          label = (<StatusIndicator type="loading" shape="icon">
                            审核中
                          </StatusIndicator>);
                          break;
                        case EIterationStatus.AUDIT_APPROVED:
                          label = (<StatusIndicator type="success" shape="icon">
                            审核通过
                          </StatusIndicator>);
                          break;
                        case EIterationStatus.PUBLISHING:
                          label = (<StatusIndicator type="loading" shape="icon">
                            发布中
                          </StatusIndicator>);
                          break;
                        case EIterationStatus.DONE:
                          label = (<StatusIndicator type="success" shape="icon">
                            迭代已完成
                          </StatusIndicator>);
                          break;
                        default:
                          label = value;
                          break;
                      }
                      return label;
                    },
                  },
                  {
                    title: intl('pack.prop.gmtModified.label'),
                    dataIndex: 'timeModified',
                    width: 200,
                    cell: (value) => {
                      const date = dayjs(parseInt(value, 10))
                      return date.fromNow();
                    },
                  },
                  {
                    title: intl('pack.prop.gmtCreate.label'),
                    dataIndex: 'timeCreated',
                    width: 200,
                    cell: (value) => {
                      const date = new Date().setTime(value);
                      return <DateTime value={date} />
                    },
                  },
                  {
                    title: intl('operation.label'),
                    dataIndex: 'status',
                    cell: (value, index, record) => {
                      const actions = [];
                      const actionData = {
                        record,
                        variables,
                        project,
                        app,
                      }

                      switch (value) {
                        case EIterationStatus.PUBLISH_FAIL:
                          actions.push(
                            <OnlineDeploy
                              {...actionData}
                            />
                          );
                          break;
                        case EIterationStatus.AUDIT_DISAPPROVED:
                          actions.push(
                            <SubmitAudit
                              {...actionData}
                            />
                          );
                          break;
                        case EIterationStatus.DELETED:
                          break;
                        case EIterationStatus.ONGOING:
                          actions.push(
                            <OnlineDeploy
                              {...actionData}
                            />
                          );
                          break;
                        case EIterationStatus.AUDITING:
                          actions.push(
                            <CancelAudit
                              {...actionData}
                            />
                          );
                          break;
                        case EIterationStatus.AUDIT_APPROVED:
                          actions.push(
                            <OnlineDeploy
                              {...actionData}
                            />
                          );
                          break;
                        case EIterationStatus.PUBLISHING:
                          actions.push(
                            <ViewLog
                              {...actionData}
                            />
                          );
                          break;
                        case EIterationStatus.DONE:
                          actions.push(
                            <DailyDeploy
                              {...actionData}
                            />
                          );
                          break;
                        default:
                          break;
                      }
                      console.log('iterationactions', actions)
                      return (
                        <Actions>{ actions }</Actions>
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
