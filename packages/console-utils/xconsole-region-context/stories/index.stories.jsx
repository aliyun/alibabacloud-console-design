import * as React from 'react';
import { storiesOf } from '@storybook/react';
import WindProRegionContext from '../src/index'

storiesOf('WindProRegionContext', module)
  .add('WindProRegionContext', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <WindProRegionContext />
      </div>
    </div>);
  })
