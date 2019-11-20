import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ConsoleDesignModel from '../src/index'

storiesOf('ConsoleDesignModel', module)
  .add('ConsoleDesignModel', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <ConsoleDesignModel />
      </div>
    </div>);
  })
