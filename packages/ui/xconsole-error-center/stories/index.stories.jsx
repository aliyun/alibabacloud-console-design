import * as React from 'react';
import { storiesOf } from '@storybook/react';
import XconsoleErrorCenter from '../src/index'

storiesOf('XconsoleErrorCenter', module)
  .add('XconsoleErrorCenter', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <XconsoleErrorCenter />
      </div>
    </div>);
  })
