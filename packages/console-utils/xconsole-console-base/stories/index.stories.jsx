import * as React from 'react';
import { storiesOf } from '@storybook/react';
import XconsoleConsoleBase from '../src/index'

storiesOf('XconsoleConsoleBase', module)
  .add('XconsoleConsoleBase', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <XconsoleConsoleBase />
      </div>
    </div>);
  })
