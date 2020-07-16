import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { getRouteFromConfig } from './route';
import { XConsoleAppProps } from './types/XConsoleAppProps';

const XConsoleApp: React.FunctionComponent<XConsoleAppProps> = (props: XConsoleAppProps) => {

  const { appConfig, history, sidebar, AppLayout } = props;
  return (
    <Router history={history}>
      <AppLayout sidebar={sidebar} appConfig={appConfig}>
        <Switch>
          { getRouteFromConfig(props) }
        </Switch>
      </AppLayout>
    </Router>
  )
}


export default XConsoleApp;
