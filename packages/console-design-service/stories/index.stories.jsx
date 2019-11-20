import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ConsoleService from '../src/index'

storiesOf('ConsoleService', module)
  .add('ConsoleService', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <ConsoleService />
      </div>
    </div>);
  })
