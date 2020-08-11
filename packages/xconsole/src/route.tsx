import React, { createElement } from 'react';
// @ts-ignore
import { forApp } from '@ali/console-base-messenger';
import { Route, RouteProps } from 'react-router-dom';
// @ts-ignore
import { withConsoleConfig } from '@alicloud/xconsole-context';
import { XConsoleAppProps } from './types/XConsoleAppProps';
import { RouteItem, RouteConfig } from './types/RouteConfig';

const getPageComponent = (
  routePath: string,
  route: RouteItem,
  appProps: XConsoleAppProps
) => {
  const { routeConfig, appConfig } = appProps;
  // @ts-ignore
  const pageComponent = withConsoleConfig<RouteConfig>(route.component);

  const routeProps = {
    path: `${routeConfig.global.prefix}/${routePath}`,
    key: routePath,
    strict: false,
    exact: !route.config.useSubRouter,
    render: (props: RouteProps) => {
      return createElement(pageComponent, {
        ...props,
        // @ts-ignore
        region: appConfig.region,
        consoleBase: forApp,
      });
    },
  };

  return <Route {...routeProps} />;
};

export const getRouteFromConfig = (appProps: XConsoleAppProps) => {
  const { routeConfig } = appProps;
  const aliasRouter = [];
  const routers = routeConfig.routes.map((route) => {
    const routeComp = getPageComponent(route.path, route, appProps);

    if (route.config.aliasRouter && route.config.aliasRouter.map) {
      route.config.aliasRouter.forEach((aliasPath) => {
        aliasRouter.push(getPageComponent(aliasPath, route, appProps));
      });
    }

    return routeComp;
  });

  return routers.concat(aliasRouter);
};
