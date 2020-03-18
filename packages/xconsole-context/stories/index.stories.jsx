import * as React from 'react';
import { storiesOf } from '@storybook/react';
import WindProProvider from '../src/index'

storiesOf('WindProProvider', module)
  .add('WindProProvider', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <WindProProvider />
      </div>
    </div>);
  })
