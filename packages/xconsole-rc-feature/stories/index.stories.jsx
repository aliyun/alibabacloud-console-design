import * as React from 'react';
import { storiesOf } from '@storybook/react';
import WindProRcFeature from '../src/index'

storiesOf('WindProRcFeature', module)
  .add('WindProRcFeature', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <WindProRcFeature />
      </div>
    </div>);
  })
