import * as React from 'react';
import { storiesOf } from '@storybook/react';
import WindProRcLink from '../src/index'

storiesOf('WindProRcLink', module)
  .add('WindProRcLink', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <WindProRcLink />
      </div>
    </div>);
  })
