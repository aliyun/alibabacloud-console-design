import React, { useContext, Fragment } from 'react';

// @ts-ignore
import { Route, Switch, Redirect } from 'dva/router';
// @ts-ignore
import { RegionContext } from '@alicloud/xconsole-context';
// @ts-ignore
import { RegionContextRoute } from '@alicloud/xconsole-rc-region'
// @ts-ignore
import ConsoleBase from '@alicloud/xconsole-console-base'
// @ts-ignore
import Logger from '@alicloud/xconsole-logger'
// @ts-ignore
import get from 'lodash.get'




const _log = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[xconsole kernal]', ...args); // eslint-disable-line no-console
  }
}


const getRouteComp = ({ routeConfig, regionList, route, routePath }) => {
  let routeComp = (
    <Route
      path={`${routeConfig.global.prefix}/${routePath}`}
      key={routePath}
      strict={false}
      exact={!route.config.useSubRouter}
      component={route.component}
    />)
  // 如果 path 中有 :regionId 就包裹一层 RegionContextRoute
  if (route.path.indexOf(':regionId') > -1) {
    routeComp = (
      <RegionContextRoute
        key={route.path}
        path={`${routeConfig.global.prefix}/${route.path}`}
        dataSource={regionList}
        exact={!route.config.useSubRouter}
        render={routeProps => <Route component={route.component} />}
      />
    )
  }

  return routeComp;
}

const getRoute = ({ routeConfig, regionList }) => {
  _log('routeConfig', routeConfig)
  const aliasRouter = [];
  const routers = routeConfig.routes.map((route) => {
    let routeComp = getRouteComp({
      routeConfig,
      regionList,
      route,
      routePath: route.path
    });


    if (route.config.aliasRouter && route.config.aliasRouter.map) {
      route.config.aliasRouter.forEach((aliasPath) => {
        aliasRouter.push(
          getRouteComp({
            routeConfig,
            regionList,
            route,
            routePath: aliasPath
          })
        )
      })
    }

    return routeComp
  });

  _log('routers', routers.concat(aliasRouter));
  return routers.concat(aliasRouter)
}

export default ({
  sidebar,
  routeConfig,
  AppLayout,
  appConfig,
}) => () => {
  const { activeRegionId } = useContext(RegionContext);
  const regionList = get(appConfig, 'consoleBase.regionList', [{ id: 'cn-hangzhou' }])
  const { prefix, redirect } = routeConfig.global;
  const redirectPath = `${prefix}/${redirect.replace(':regionId', activeRegionId)}`;
  let PageLayout = function (props) { return props.children }
  try {
    var req = require.context('~/pages', false, /layout\.jsx?$/);
    var module = req(req.keys()[0])
    if (module.default) {
      PageLayout = module.default
    }
  } catch (e) { }
  return (
    <Route path="/">
      <Fragment>
         {
           appConfig.consoleBase && <ConsoleBase {...appConfig.consoleBase} />
         }
         {
           (appConfig.logger && appConfig.logger.enable) &&
           <Logger config={appConfig.logger} />
         }
        <Switch>
          <AppLayout sidebar={sidebar}>
            <Route render={(routeProps) => (
              <PageLayout {...routeProps}>
                <Switch>
                  {...getRoute({ routeConfig, regionList })}
                  <Redirect to={redirectPath} />
                </Switch>
              </PageLayout>
            )}/>
          </AppLayout>
        </Switch>
      </Fragment>
    </Route>
  );
}
