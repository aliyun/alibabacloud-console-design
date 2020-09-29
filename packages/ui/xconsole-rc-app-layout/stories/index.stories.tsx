import * as React from 'react';
import '@alicloud/console-components/dist/wind.css';
// @ts-ignore
import { storiesOf } from '@storybook/react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import WindProRcAppLayout from '../src/index';

import { sidebar } from './sidebar';

storiesOf('XConsoleAppLayout', module).add('XConsoleAppLayout', () => {
  return (
    <div id="app-wrapper">
      <div id="app">
        <Router history={createBrowserHistory()}>
          <WindProRcAppLayout sidebar={sidebar} />
        </Router>
      </div>
    </div>
  );
});
