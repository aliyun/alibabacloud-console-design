import * as React from 'react';
import { storiesOf } from '@storybook/react';
import XconsoleService from '../src/index'

storiesOf('XconsoleService', module)
  .add('XconsoleService', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <XconsoleService />
      </div>
    </div>);
  })
