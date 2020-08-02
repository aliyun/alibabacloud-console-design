import React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import { getRouteFromConfig } from './route';
import { XConsoleAppProps } from './types/XConsoleAppProps';

const XConsoleApp: React.FunctionComponent<XConsoleAppProps> = (
  props: XConsoleAppProps
) => {
  const { appConfig, history, sidebar, AppLayout, routeConfig } = props;
  return (
    <Router history={history}>
      <AppLayout sidebar={sidebar} consoleMenu={appConfig.consoleMenu}>
        <Switch>
          {getRouteFromConfig(props)}
          <Redirect to={routeConfig.global.redirect} />
        </Switch>
      </AppLayout>
    </Router>
  );
};

export default XConsoleApp;
