/*
* useSubRouter: true
*/
import React, { Fragment, useState, useMemo, useEffect } from 'react'
import { intl, PageHeader, Query } from '@alicloud/xconsole'
import { Tag } from '@alicloud/xconsole/ui'
import IterationList from './IterationList'
import DeployList from './DeployList'


import {
  GetApps,
} from '~/model'

import {
  ROUTERS,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'


export default (props) => {
  const [currentAct, setAct] = useState('iteration');

  const {
    history,
    match: {
      url,
      params: {
        project,
        app,
      },
    },
  } = props;


  useEffect(() => {
    const pathAct = document.location.pathname.replace(`${url}`, '').slice(1) || 'iteration';

    if (pathAct !== currentAct) {
      setAct(pathAct);
    }
  })


  const nav = useMemo(() => ({
    shape: 'menu',
    activeKey: currentAct,
    onChange: (value) => {
      const applicationUrl = getRoutePath(ROUTERS.APPLICATION, {
        project,
        app,
      })
      console.log('applicationUrl', applicationUrl)
      history.push(`${applicationUrl}/be/${value}`)
    },
    items: [
      {
        key: 'iteration',
        title: intl('title.iteration'),
      },
      {
        key: 'deploy',
        title: intl('title.deploy'),
      },
    ],
  }),
  [currentAct]);

  const List = currentAct === 'iteration' ? IterationList : DeployList;

  const projectUrl = getRoutePath(ROUTERS.PROJECT, {
    project,
  })
  const applicationUrl = getRoutePath(ROUTERS.APPLICATION, {
    project,
    app,
  })

  return (
    <Query
      query={GetApps}
      variables={{ project }}
    >
      {
        ({ data, _error, _loading, _refetch, _variables }) => {
          const ProjectApps = (data.data || []).map(item => ({
            value: item.appName,
            label: item.name,
            type: item.type,
          }));
          const projectApp = ProjectApps.filter(element => (`${element.value}` === `${app}`));
          const title = projectApp.length === 1 ? projectApp[0].label : app;

          return (
            <PageHeader
              title={(
                <Fragment>
                  {title}
                </Fragment>
            )}
              subSwitcher={{ dataSource: ProjectApps,
                onChange: (value, __idx, record) => {
                  if (record.type === '1') {
                    history.push(`${applicationUrl}/be/${currentAct}`)
                  }
                  if (record.type === '2') {
                    history.push(`${applicationUrl}/fe/${currentAct}`)
                  }
                },
                defaultValue: app }}
              historyBack={applicationUrl}
              nav={nav}
              breadcrumbs={[
                {
                  to: getRoutePath(ROUTERS.HOME),
                  text: intl('title.home'),
                },
                {
                  to: projectUrl,
                  text: intl('title.project'),
                },
                {
                  to: applicationUrl,
                  text: intl('title.application'),
                },
              ]}
            >
              <List {...props} project={project} app={app} />
            </PageHeader>
          )
        }
      }
    </Query>
  )
}
