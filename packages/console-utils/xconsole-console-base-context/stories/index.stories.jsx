import * as React from 'react';
import { storiesOf } from '@storybook/react';
import WindProConsoleBaseContext from '../src/index'

storiesOf('WindProConsoleBaseContext', module)
  .add('WindProConsoleBaseContext', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <WindProConsoleBaseContext />
      </div>
    </div>);
  })
