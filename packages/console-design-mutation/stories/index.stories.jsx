import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ConsoleMutation from '../src/index'

storiesOf('ConsoleMutation', module)
  .add('ConsoleMutation', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <ConsoleMutation />
      </div>
    </div>);
  })
