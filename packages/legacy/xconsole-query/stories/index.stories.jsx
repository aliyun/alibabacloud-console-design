import * as React from 'react';
import { storiesOf } from '@storybook/react';
import XconsoleQuery from '../src/index'

storiesOf('XconsoleQuery', module)
  .add('XconsoleQuery', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <XconsoleQuery />
      </div>
    </div>);
  })
