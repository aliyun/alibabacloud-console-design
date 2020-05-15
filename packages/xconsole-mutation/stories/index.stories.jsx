import * as React from 'react';
import { storiesOf } from '@storybook/react';
import XconsoleMutation from '../src/index'

storiesOf('XconsoleMutation', module)
  .add('XconsoleMutation', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <XconsoleMutation />
      </div>
    </div>);
  })
