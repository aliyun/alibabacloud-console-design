import React, { useState } from 'react';
import { Router, Switch, Redirect } from 'dva/router';
import { RegionContext } from '@alicloud/xconsole-context';
import { getRouteFromConfig } from './route';
import { XConsoleAppProps } from './types/XConsoleAppProps';

const XConsoleApp: React.FunctionComponent<XConsoleAppProps> = (
  props: XConsoleAppProps
) => {
  const { appConfig, history, sidebar, AppLayout, routeConfig } = props;
  const [ activeRegionId, setActiveRegionId ] = useState(undefined);
  const redirect = (routeConfig.global.redirect || '').replace(':regionId', activeRegionId);
  return (
    <Router history={history}>
      <RegionContext.Provider value={{activeRegionId, setActiveRegionId}}>
        <AppLayout
          sidebar={sidebar}
          consoleMenu={appConfig.consoleMenu}
          menuParams={{regionId: activeRegionId}}
        >
          <Switch>
            {getRouteFromConfig(props)}
            <Redirect
              to={`${routeConfig.global.prefix}/${redirect}`}
            />
          </Switch>
        </AppLayout>
      </RegionContext.Provider>
    </Router>
  );
};

export default XConsoleApp;
