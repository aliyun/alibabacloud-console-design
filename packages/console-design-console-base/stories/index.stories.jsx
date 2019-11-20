import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ConsoleBase from '../src/index'

storiesOf('ConsoleBase', module)
  .add('ConsoleBase', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <ConsoleBase />
      </div>
    </div>);
  })
