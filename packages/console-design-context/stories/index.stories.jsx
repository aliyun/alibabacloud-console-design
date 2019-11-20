import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ConsoleDesignContext from '../src/index'

storiesOf('ConsoleDesignContext', module)
  .add('ConsoleDesignContext', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <ConsoleDesignContext />
      </div>
    </div>);
  })
