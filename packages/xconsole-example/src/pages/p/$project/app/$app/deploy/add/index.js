import React from 'react'
import { intl, PageHeader, Query } from '@alicloud/xconsole'
import DeployCreator from './DeployCreator'

import {
  GetOnlineDeployVersions,
} from '~/model'

import {
  ROUTERS,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'

const getVersions = (list = []) => list.map(item => ({
  label: item.packageVersion,
  value: item.packageVersion,
})).filter((_item, index) => (index === 0))


export default (props) => {
  const {
    match: {
      params: {
        project,
        app,
      },
    },
  } = props;

  return (
    <PageHeader
      title={intl('title.backendDev.deploy.add')}
      breadcrumbs={[
        {
          to: getRoutePath(ROUTERS.HOME),
          text: intl('title.home'),
        },
        {
          to: getRoutePath(ROUTERS.PROJECT, {
            project,
          }),
          text: intl('title.project'),
        },
        {
          to: getRoutePath(ROUTERS.APPLICATION, {
            project,
            app,
          }),
          text: intl('title.application'),
        },
        {
          to: getRoutePath(ROUTERS.DEPLOY, {
            project,
            app,
          }),
          text: intl('title.backendDev.deploy'),
        },
      ]}
      historyBack={getRoutePath(ROUTERS.DEPLOY, {
        project,
        app,
      })}
    >
      <div style={{ width: '60%' }}>

        <Query
          query={GetOnlineDeployVersions}
          variables={{ appName: app }}
        >
          {
          ({ data, loading, error }) => (
            <DeployCreator {...props} project={project} app={app} versions={getVersions(data.data)} />
          )
        }
        </Query>


      </div>
    </PageHeader>
  )
}

