import * as React from 'react';
import '@alicloud/console-components/dist/wind.css';
// @ts-ignore
import { storiesOf } from '@storybook/react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import WindProRcAppLayout, { AppLayoutContext } from '../src/index';

import { sidebar } from './sidebar';

const Test: React.FC<{}> = (props) => {
  const { onNavTriggerClick } = React.useContext(AppLayoutContext);
  // React.useEffect(() => {
  //   return onNavTriggerClick(() => {

  //   })
  // })

  return <div />
}

storiesOf('XConsoleAppLayout', module).add('XConsoleAppLayout', () => {
  return (
    <div id="app-wrapper">
      <div id="app">
        <Router history={createBrowserHistory()}>
          <WindProRcAppLayout sidebar={sidebar} consoleMenu={{collapsedPath: ['/basic-profile']}}>
            <Test/>
          </WindProRcAppLayout>
        </Router>
      </div>
    </div>
  );
});
