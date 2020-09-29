import * as React from 'react';
import { storiesOf } from '@storybook/react';
import XconsoleLogger from '../src/index'

storiesOf('XconsoleLogger', module)
  .add('XconsoleLogger', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <XconsoleLogger />
      </div>
    </div>);
  })
