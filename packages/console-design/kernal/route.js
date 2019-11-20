import React, { 
  useContext,
} from 'react'
import { 
  Route, 
  Switch, 
  Redirect,
} from 'dva/router'
import get from 'lodash.get'

import Logger from '@alicloud/console-design-logger'
import ConsoleBase from '@alicloud/console-design-console-base'
import { RegionContext } from '@alicloud/console-design-context'
import { RegionContextRoute } from '@alicloud/console-components-region'

var getGlobalRoute = ({ routeConfig }) => {
  return routeConfig.routes.filter(route => route.config.appMenu === false)
    .map((route) => {
      return React.createElement(Route, {
        path: `${routeConfig.global.prefix}/${route.path}`,
        key: route.path,
        strict: true,
        exact: true,
        component: route.component,
      })
    });
}

var getRouteInLayout = ({ routeConfig }) => {
  return routeConfig.routes.filter(route => route.config.appMenu !== false && route.path.split('/')[0] !== ':regionId')
    .map((route) => {
      return React.createElement(Route, {
        path: `${routeConfig.global.prefix}/${route.path}`,
        key: route.path,
        strict: true,
        exact: true,
        component: route.component,
      })
    });
}

var getRouteWithRegion = ({ routeConfig, regionList, activeRegionId }) => {
  var routes = routeConfig.routes.filter(route => route.config.appMenu !== false && route.path.split('/')[0] === ':regionId')
    .map((route) => {
      return React.createElement(Route, {
        path: `${routeConfig.global.prefix}/${route.path}`,
        key: route.path,
        strict: true,
        exact: true,
        component: route.component,
      })
    });

  return React.createElement(
    RegionContextRoute,
    {
      path: `${routeConfig.global.prefix}/:regionId`,
      dataSource: regionList,
      render: function () {
        return React.createElement(
          Switch,
          null,
          ...routes,
          React.createElement(
            Redirect, {
              to: `${routeConfig.global.prefix}/${routeConfig.global.redirect.replace(':regionId', activeRegionId)}`,
            }
          )
        )
      }
    }
  )
}

export default ({ sidebar, routeConfig, AppLayout }) => () => {
  var regionContextValue = useContext(RegionContext) || {};
  var activeRegionId = regionContextValue.activeRegionId
  var Layout = function (props) {
    return props.children
  }

  try {
    var req = require.context('~/pages', true, /layout\.jsx?$/);
    var module = req(req.keys()[0])
    if (module.default) {
      Layout = module.default
    }
  } catch (e) {}

  var appConfig = {}
  try {
    var appConfigReq = require.context('~', true, /appConfig\.jsx?$/);
    var appConfigModule = appConfigReq(appConfigReq.keys()[0])
    if (appConfigModule.default) {
      appConfig = appConfigModule.default
    }
  } catch (e) {}

  const regionList = get(appConfig, 'consoleBase.regionList', [])

  return (
    React.createElement(
      Route,
      { path: '/' },
      React.createElement(
        Switch,
        {},
        ...getGlobalRoute({ routeConfig }),
        React.createElement(
          AppLayout,
          { sidebar },
          React.createElement(ConsoleBase, { regionList: regionList }),
          React.createElement(
            Route,
            {
              render: function (routeProps) {
                var history = routeProps ? routeProps.history : {}
                return React.createElement(
                  Layout,
                  routeProps,
                  React.createElement(Logger, { config: appConfig.logger, routeConfig, history }),
                  React.createElement(
                    Switch,
                    {},
                    ...getRouteInLayout({ routeConfig }),
                    getRouteWithRegion({ routeConfig, regionList: regionList, activeRegionId }),
                    React.createElement(
                      Redirect, {
                        to: `${routeConfig.global.prefix}/${routeConfig.global.redirect.replace(':regionId', activeRegionId)}`,
                      }
                    )
                  )
                )
              }
            }
          )
        )
      )
    )
  );
}
