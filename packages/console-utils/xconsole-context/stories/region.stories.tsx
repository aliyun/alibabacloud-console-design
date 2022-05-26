import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
// @ts-ignore
import { forApp } from '@ali/console-base-messenger';
// @ts-ignore
import { storiesOf } from '@storybook/react';
import { withConsoleConfig, ConsoleContext, withRcBaseMessenger } from '../src/index';
import './config';

const REGION_LIST = [
  { id: 'cn-shanghai', name: '上海' },
  { id: 'cn-hangzhou', name: '杭州' }
]

const App = 
withRcBaseMessenger(
  // @ts-ignore
  withConsoleConfig((props) => {
    const { region, resourceGroup } = useContext(ConsoleContext);
    return <div>
      {region.getCurrentRegionId()}
      {resourceGroup.getCurrentResourceGroup()}
    </div>;
  })
);

storiesOf('Console Configuration', module)
  .add('Region', () => {
    return (
      <div id="app-wrapper">
        <Router>
          <Switch>
            <Route path="/:regionId?" 
              render={(props) => (
                <App
                  {...props}
                  consoleBase={forApp}
                  region={{
                    regionList: REGION_LIST,
                    regionbarVisiblePaths: [
                      '/:regionId'
                    ],
                    globalVisiblePaths: [
                      '/:regionId'
                    ]
                  }}
                  resourceGroup={{
                    resourceGroupVisiblePaths: [
                      '/:regionId'
                    ],
                    routeType: 'query'
                  }}
                />
              )}
            />
          </Switch>
        </Router>
      </div>  
    );
  })
  .add('Dynamic Region', () => {
    return (
      <div id="app-wrapper">
        <Router>
          <Switch>
            <Route path="/:regionId?" 
              render={(props) => (
                <App
                  {...props}
                  consoleBase={forApp}
                  region={{
                    regionList: () => {
                      return new window.Promise((resolve) => {
                        setTimeout(() => {
                          resolve(REGION_LIST)
                        }, 4000)
                      });
                    },
                    regionbarVisiblePaths: [
                      '/:regionId'
                    ]
                  }}
                />
              )}
            />
          </Switch>
        </Router>
      </div>  
    );
  });
