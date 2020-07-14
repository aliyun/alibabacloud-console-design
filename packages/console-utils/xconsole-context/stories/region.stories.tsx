import React, { useState, useContext } from 'react';
import {
  HashRouter as Router, Route, Switch
} from 'react-router-dom';
// @ts-ignore
import { forApp } from '@ali/console-base-messenger';
// @ts-ignore
import { storiesOf } from '@storybook/react';
import { withConsoleConfig, ConsoleContext } from '../src/index';
import './config';

const REGION_LIST = [
  { id: 'cn-shanghai', name: '上海' },
  { id: 'cn-hangzhou', name: '杭州' }
]

// @ts-ignore
const App = withConsoleConfig((props) => {
  const { region } = useContext(ConsoleContext);
  console.log(region.getCurrentRegionId());
  return <div>{region.getCurrentRegionId()}</div>;
});

storiesOf('Console Configuration', module).add('Region', () => {
  return (
    <div id="app-wrapper">
      <Router>
        <Switch>
          <Route path="/:regionId?" 
            render={(props) => (
              <App
                {...props}
                consoleBase={forApp}
                regionList={REGION_LIST}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
});
