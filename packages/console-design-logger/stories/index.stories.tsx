import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ConsoleLogger from '../src/index'

storiesOf('ConsoleLogger', module)
  .add('ConsoleLogger', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <ConsoleLogger />
      </div>
    </div>);
  })
